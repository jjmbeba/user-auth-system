import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async getAllRoles() {
    return this.prisma.role.findMany();
  }

  async getRoleByName(name: string) {
    return this.prisma.role.findUnique({
      where: {
        name,
      },
    });
  }
}
