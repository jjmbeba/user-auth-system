import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@src/auth/dto';

@Injectable()
export class AuthService {
  async login(dto: LoginDto) {
    return 'Login';
  }

  async register(dto: RegisterDto) {
    return dto;
  }
}
