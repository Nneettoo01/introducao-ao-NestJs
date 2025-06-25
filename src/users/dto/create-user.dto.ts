import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'Neto', description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ example: 'neto@gmail.com', description: 'Email do usuário' })
  email: string;
}
