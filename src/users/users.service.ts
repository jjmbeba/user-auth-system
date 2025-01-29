import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true
      }
    });
  }

  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId
      }
    })
  }
}
