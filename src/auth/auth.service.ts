import { BadRequestException, Component, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { authentication } from '../authentication';
import { User } from '../users/user.entity';

import { Credentials } from './credentials';

const BAD_CREDENTIALS = 'Invalid email or password';

@Component()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createToken(credentials: Credentials, token: string) {
    if (credentials.strategy !== 'local' && credentials.strategy !== 'jwt') {
      throw new BadRequestException();
    }

    let userId: number;

    if (credentials.strategy === 'local') {
      if (!credentials.username || !credentials.password) {
        throw new BadRequestException();
      }

      userId = await this.validateUserByCredentials(credentials);
    }

    if (credentials.strategy === 'jwt') {
      if (!token) {
        throw new BadRequestException();
      }

      userId = await this.validateUserByToken(token);
    }

    const newToken = jwt.sign({ userId }, authentication.secret, authentication.jwt);

    return {
      access_token: newToken,
    };
  }

  private async validateUserByCredentials(credentials: Credentials): Promise<number> {
    const realUser = await this.userRepository.findOne({ username: credentials.username });

    if (!realUser) {
      throw new UnauthorizedException(BAD_CREDENTIALS);
    }

    const isPasswordsMatch = await bcrypt.compare(credentials.password, realUser.password);

    if (!isPasswordsMatch) {
      throw new UnauthorizedException(BAD_CREDENTIALS);
    }

    return realUser.id;
  }

  private async validateUserByToken(token: string): Promise<number> {
    try {
      const decodedToken: any = jwt.verify(token, authentication.secret);

      return decodedToken.userId;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
