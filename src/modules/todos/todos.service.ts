import { Component, NotFoundException, BadRequestException } from '@nestjs/common';

import { Todo } from './todo';

@Component()
export class TodosService {
  private readonly todos: Todo[] = [
    {
      id: 1,
      title: 'Feed the cat',
      completed: false,
    },
    {
      id: 2,
      title: 'Buy groceries',
      completed: true,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(t => t.id === id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  create(todo: Todo): Todo {
    this.todos.push(todo);

    return todo;
  }

  update(id: number, todo: Todo): Todo {
    const todoIndex = this.todos.findIndex(t => t.id === id);

    if (id !== todo.id) {
      throw new BadRequestException();
    }

    if (todoIndex === -1) {
      throw new NotFoundException();
    }

    this.todos[todoIndex] = todo;

    return todo;
  }

  delete(id: number): void {
    const todoIndex = this.todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException();
    }

    this.todos.splice(todoIndex, 1);
  }
}
