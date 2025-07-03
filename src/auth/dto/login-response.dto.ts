import { IsString } from 'class-validator';

export class LoginResponseDto {
  @IsString()
  acess_token: string;
}
