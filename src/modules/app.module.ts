import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosModule } from './todos/todos.module';

const CONNECTION_TYPE = process.env.DATABASE_URL ? 'postgres' : 'mysql' as any;
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/nest_todo_app';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: CONNECTION_TYPE,
      url: DATABASE_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TodosModule,
  ],
  controllers: [],
  components: [],
})
export class AppModule {}
