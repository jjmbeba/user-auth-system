import { Body, Controller, Post, UseGuards, Request, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { LoginDto, RegisterDto } from '@src/auth/dto';
import { LocalAuthGuard } from '@src/auth/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(LocalAuthGuard)
  @Get('protected')
  async protected() {
    return 'This is a protected route';
  }
}
