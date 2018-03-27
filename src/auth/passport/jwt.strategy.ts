import { Component, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { authentication } from '../../authentication';
import { User } from '../../users/user.entity';

import { ActiveUser } from '../active-user';

@Component()
export class JwtStrategy extends Strategy {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: authentication.secret,
      },
      async (req: any, payload: any, next: any) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  async verify(req: any, payload: { userId: string }, done: any) {
    const user = await this.userRepository.findOneById(payload.userId);

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, { id: user.id, role: user.role } as ActiveUser);
  }
}
