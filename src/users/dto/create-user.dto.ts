import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'Neto', description: 'Nome do usuário' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty({ example: 'neto@gmail.com', description: 'Email do usuário' })
  @IsEmail({}, { message: 'O email deve ser um endereço válido' })
  email: string;

  @ApiProperty({ example: 'Neto12345', description: 'Senha do usuário' })
  @IsString()
  password: string;
}
