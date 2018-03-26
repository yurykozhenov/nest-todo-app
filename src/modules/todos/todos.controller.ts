import { Body, Get, Controller, Post, Param, Delete, Patch } from '@nestjs/common';

import { Todo } from './todo.entity';

import { TodosService } from './todos.service';
import { AuthenticatedUser } from '../auth/authenticated-user.decorator';
import { ActiveUser } from '../auth/active-user';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Get()
  async findAll(@AuthenticatedUser() user: ActiveUser): Promise<Todo[]> {
    return await this.todosService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
                @AuthenticatedUser() user: ActiveUser): Promise<Todo> {
    return await this.todosService.findOne(Number(id), user.id);
  }

  @Post()
  async create(@Body() todo: Todo,
               @AuthenticatedUser() user: ActiveUser): Promise<Todo> {
    return await this.todosService.create(todo, user.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string,
               @Body() todo: Todo,
               @AuthenticatedUser() user: ActiveUser): Promise<Todo> {
    return await this.todosService.update(Number(id), todo, user.id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string,
               @AuthenticatedUser() user: ActiveUser): Promise<void> {
    return await this.todosService.delete(Number(id), user.id);
  }
}
