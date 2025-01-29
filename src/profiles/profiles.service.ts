import { Injectable } from '@nestjs/common';
import { EditProfileDto } from '@src/profiles/dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
    constructor(private prisma: PrismaService) { }

    async editProfile(userId: string, editProfileDto: EditProfileDto) {
        return await this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                ...editProfileDto
            }
        })
    }
}
