import {
  Component,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from './todo.entity';

@Component()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: number): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException();
    }

    return todo;
  }

  async create(todo: Todo, userId: number): Promise<Todo> {
    Reflect.deleteProperty(todo, 'id');
    todo.userId = userId;

    return await this.todoRepository.save(todo);
  }

  async update(id: number, todo: Todo, userId: number): Promise<Todo> {
    if (todo.id && id !== todo.id) {
      throw new BadRequestException();
    }

    const realTodo = await this.findOne(id, userId);
    todo.userId = realTodo.userId;

    await this.todoRepository.updateById(id, todo);

    return { ...realTodo, ...todo };
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId);

    return await this.todoRepository.deleteById(id);
  }
}
