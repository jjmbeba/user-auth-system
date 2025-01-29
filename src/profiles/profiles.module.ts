import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  providers: [ProfilesService],
  controllers: [ProfilesController],
  imports: [PrismaModule],
})
export class ProfilesModule {}
