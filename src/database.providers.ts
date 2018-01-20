import { createConnection } from 'typeorm';

import { DB_CONNECTION_TOKEN } from './constants';

const CONNECTION_TYPE = process.env.DATABASE_URL ? 'postgres' : 'mysql' as any;
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/nest_todo_app';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => await createConnection({
      type: CONNECTION_TYPE,
      url: DATABASE_URL,
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
