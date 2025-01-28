import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '@src/auth/decorators';
import { JwtAuthGuard } from '@src/auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {
    @Get()
    async getProfile(@GetUser() user: User) {
        return user;
    }
}
