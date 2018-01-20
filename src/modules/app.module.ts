import { Module } from '@nestjs/common';

import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule],
  controllers: [],
  components: [],
})
export class AppModule {
}
