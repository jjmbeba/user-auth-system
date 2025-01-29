import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '@src/auth/decorators';
import { JwtAuthGuard } from '@src/auth/guards';
import { EditProfileDto } from '@src/profiles/dto';
import { ProfilesService } from './profiles.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {
    constructor (private profilesService: ProfilesService) {}
    @Get()
    async getProfile(@GetUser() user: User) {
        return user;
    }

    @Patch()
    async editProfile(@GetUser('id') userId: string, @Body() editProfileDto: EditProfileDto) {
        return this.profilesService.editProfile(userId, editProfileDto);
    }
}
