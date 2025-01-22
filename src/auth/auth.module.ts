import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@src/users/users.module';
import { RolesModule } from '@src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfilesModule } from '@src/profiles/profiles.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, RolesModule, JwtModule.register({}), ProfilesModule],
})
export class AuthModule {}
