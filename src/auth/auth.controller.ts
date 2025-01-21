import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@src/auth/dto';
import { AuthService } from '@src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
