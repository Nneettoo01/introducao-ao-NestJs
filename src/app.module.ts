import { Module } from '@nestjs/common';
import { userModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';

@Module({
  imports: [userModule, PrismaModule, AuthModule, PlaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
