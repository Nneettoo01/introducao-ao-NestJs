import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UsersController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // @Post()
  // @ApiOperation({ summary: 'Criar um novo usuário' })
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({ status: 201, description: 'Usuário criado com sucesso!' })
  // create(@Body() data: CreateUserDto) {
  //   return this.userService.create(data);
  // }

  @ApiOperation({ summary: 'Listar todos os usuários.' })
  @ApiResponse({ status: 200, description: 'Usuários encontrados!' })
  @ApiResponse({ status: 404, description: 'Usuários não encontrados.' })
  @ApiBearerAuth()
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Listar um unico usuário.' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado!' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um dado do usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso!' })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso!' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
