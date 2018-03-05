import { Component, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from './todo.entity';

@Component()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

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
    Reflect.deleteProperty(todo, 'id');

    return await this.todoRepository.save(todo);
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

    return await this.todoRepository.deleteById(id);
  }
}
