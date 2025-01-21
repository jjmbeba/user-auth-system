import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
