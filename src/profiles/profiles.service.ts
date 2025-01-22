import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateProfileDto } from '@src/profiles/dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async initializeProfile(dto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: {
        userId: dto.userId,
      },
    });
  }
}
