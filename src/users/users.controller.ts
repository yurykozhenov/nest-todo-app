import { Body, Get, Controller, Post, Param, Patch } from '@nestjs/common';

import { AuthenticatedUser } from '../auth/authenticated-user.decorator';
import { ActiveUser } from '../auth/active-user';

import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(Number(id));
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string,
               @Body() user: User,
               @AuthenticatedUser() activeUser: ActiveUser): Promise<User> {
    return await this.usersService.update(Number(id), user, activeUser.id);
  }
}
