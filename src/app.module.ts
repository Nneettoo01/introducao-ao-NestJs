import { Module } from '@nestjs/common';
import { userModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [userModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
