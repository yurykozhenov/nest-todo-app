import { Component, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TODO_REPOSITORY_TOKEN } from '../../constants';
import { Todo } from './todo';

@Component()
export class TodosService {
  constructor(@Inject(TODO_REPOSITORY_TOKEN) private readonly todoRepository: Repository<Todo>) {
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  async create(todo: Todo): Promise<Todo> {
    return await this.todoRepository.save({ ...todo, id: null });
  }

  async update(id: number, todo: Todo): Promise<void> { // Promise<Todo>
    if (id !== todo.id) {
      throw new BadRequestException();
    }

    // if (todoNotFound) {
    //   throw new NotFoundException();
    // }

    return await this.todoRepository.updateById(id, todo);
  }

  async delete(id: number): Promise<void> {
    // if (todoNotFound) {
    //   throw new NotFoundException();
    // }

    return await this.todoRepository.removeById(id);
  }
}
