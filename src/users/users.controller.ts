import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('/users')
export class UsersControllers {
  private userService: UserService;

  constructor(u: UserService) {
    this.userService = u;
  }

  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneUser(@Param(':id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Post()
  createUser(@Body() user: { name: string; email: string }) {
    return this.userService.create(user);
  }
}
