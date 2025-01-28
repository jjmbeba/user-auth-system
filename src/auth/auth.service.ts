import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto, RegisterDto } from '@src/auth/dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { RolesService } from '@src/roles/roles.service';
import { UsersService } from '@src/users/users.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new BadRequestException('User credentials invalid');

    const passwordsMatch = await argon.verify(user.passwordHash, password);

    if (!passwordsMatch)
      throw new BadRequestException('User credentials invalid');

    delete user.passwordHash;

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    return this.generateToken(user.id, user.email);
  }

  async register(registerDto: RegisterDto) {
    const passwordHash = await argon.hash(registerDto.password);

    try {
      const { id: roleId } = await this.rolesService.getRoleByName('user');
      const newUser = await this.prisma.$transaction(async () => {
        const user = await this.prisma.user.create({
          data: {
            email: registerDto.email,
            passwordHash,
            roleId,
          },
        });

        const newProfile = await this.prisma.profile.create({
          data: {
            userId: user.id,
          }
        })

        return user;
      })
      return this.generateToken(
        newUser.id,
        newUser.email,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }

      console.error('Error during user registration:', error);
      throw error;
    }
  }

  async generateToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
