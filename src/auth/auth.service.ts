import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async registerUser(UserData: RegisterUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: UserData.email },
    });
    if (userExists) {
      throw new ConflictException('Usuário ja cadastrado');
    }
    const hashedPassword = await bcrypt.hash(UserData.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name: UserData.name,
        email: UserData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return newUser;
  }
}
