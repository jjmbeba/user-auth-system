import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { RoleName } from '@src/roles/types';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async getAllRoles() {
    return this.prisma.role.findMany();
  }

  async getRoleByName(name: RoleName) {
    return this.prisma.role.findUnique({
      where: {
        name,
      },
    });
  }
}
