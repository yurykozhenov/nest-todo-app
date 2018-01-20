import { Body, Get, Controller, Post, Param, Delete, Put } from '@nestjs/common';

import { Todo } from './todo';

import { TodosService } from './todos.service';

@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

	@Get()
	async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(Number(id));
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  async update(@Param('id') id: string,
               @Body() todo: Todo) {
    return this.todosService.update(Number(id), todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todosService.delete(Number(id));
  }
}
