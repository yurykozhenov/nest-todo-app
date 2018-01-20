import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database.module';

import { TodosController } from './todos.controller';
import { todoProviders } from './todo.providers';
import { TodosService } from './todos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TodosController],
  components: [
    ...todoProviders,
    TodosService,
  ],
})
export class TodosModule {
}
