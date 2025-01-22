import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@src/auth/dto';
import * as argon from 'argon2';
import { UsersService } from '@src/users/users.service';
import { RolesService } from '@src/roles/roles.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProfilesService } from '@src/profiles/profiles.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private roleService: RolesService,
    private config: ConfigService,
    private jwt: JwtService,
    private profilesService: ProfilesService,
  ) {}

  async login(dto: LoginDto) {
    return 'Login';
  }

  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);
    const role = await this.roleService.getRoleByName('user');

    const user = await this.userService.createUser({
      email: dto.email,
      passwordHash: hash,
      roleId: role.id,
    });

    await this.profilesService.initializeProfile({
      userId: user.id,
    });

    return this.generateToken(user.id, user.email);
  }

  async generateToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
