import { Body, Get, Controller, Post, Param, Delete, Put } from '@nestjs/common';

import { Todo } from './todo.entity';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return await this.todosService.findOne(Number(id));
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  async update(@Param('id') id: string,
               @Body() todo: Todo): Promise<void> { // Promise<Todo>
    return this.todosService.update(Number(id), todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.todosService.delete(Number(id));
  }
}
