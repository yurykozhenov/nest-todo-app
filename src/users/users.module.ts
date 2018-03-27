import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as passport from 'passport';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  components: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/users', method: RequestMethod.GET },
        { path: '/users/**', method: RequestMethod.ALL },
      );
  }
}
