import { Connection, Repository } from 'typeorm';

import { TODO_REPOSITORY_TOKEN, DB_CONNECTION_TOKEN } from '../../constants';
import { TodoEntity } from './todo.entity';

export const todoProviders = [
  {
    provide: TODO_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(TodoEntity),
    inject: [DB_CONNECTION_TOKEN],
  },
];
