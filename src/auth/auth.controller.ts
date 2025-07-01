import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({ type: RegisterUserDto })
  @ApiCreatedResponse({
    description: 'Usuário registrado com sucesso!',
  })
  @ApiConflictResponse({
    description: 'Usuário já cadastrado.',
  })
  @Post('register')
  async register(@Body() userData: RegisterUserDto) {
    return this.authService.registerUser(userData);
  }
}
