import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@src/users/users.module';
import { RolesModule } from '@src/roles/roles.module';
import { LocalStrategy } from '@src/auth/strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@src/auth/strategy'

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    UsersModule,
    RolesModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
