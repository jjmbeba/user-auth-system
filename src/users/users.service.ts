import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateUserDto } from '@src/users/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash: dto.passwordHash,
          role: {
            connect: {
              id: dto.roleId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User with this email already exists');
        }
      }
      throw error;
    }
  }
}
