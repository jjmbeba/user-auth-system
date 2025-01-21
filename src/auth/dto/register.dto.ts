import { IsEmail, IsStrongPassword } from 'class-validator';
import { Match } from '@src/auth/decorators';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;

  @Match('password', {
    message: 'Password and confirm password do not match',
  })
  confirmPassword: string;
}
