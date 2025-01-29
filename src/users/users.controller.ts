import { Controller, Delete, UseGuards } from '@nestjs/common';
import { GetUser } from '@src/auth/decorators';
import { JwtAuthGuard } from '@src/auth/guards';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@GetUser('id') userId: string) {
        return this.usersService.deleteUser(userId);
    }
}
