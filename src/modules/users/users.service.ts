import {
  Component,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

import { User } from './user.entity';

const BCRYPT_WORK_FACTOR_BASE = 12;
const BCRYPT_DATE_BASE = 1483228800000;
const BCRYPT_WORK_INCREASE_INTERVAL = 47300000000;

@Component()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map(user => this.removePassword(user));
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.removePassword(user);
  }

  async create(user: User): Promise<User> {
    Reflect.deleteProperty(user, 'id');

    const password = await this.hashPassword(user.password);
    const newUser = await this.userRepository.save({ ...user, password });

    return this.removePassword(newUser);
  }

  async update(id: number, user: User, activeUserId: number): Promise<User> {
    if (user.id && id !== user.id) {
      throw new BadRequestException();
    }

    const realUser = await this.findOne(id);

    if (id !== activeUserId) {
      throw new ForbiddenException();
    }

    if (user.password) {
      user.password = await this.hashPassword(user.password);
    }

    await this.userRepository.updateById(id, user);

    const updatedUser = { ...realUser, ...user };

    return this.removePassword(updatedUser);
  }

  private async hashPassword(password: string): Promise<string> {
    const BCRYPT_CURRENT_DATE = new Date().getTime();
    const BCRYPT_WORK_INCREASE = Math.max(
      0,
      Math.floor((BCRYPT_CURRENT_DATE - BCRYPT_DATE_BASE) / BCRYPT_WORK_INCREASE_INTERVAL),
    );
    const BCRYPT_WORK_FACTOR = Math.min(19, BCRYPT_WORK_FACTOR_BASE + BCRYPT_WORK_INCREASE);

    const salt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR);

    return await bcrypt.hash(password, salt);
  }

  private removePassword(user: User): User {
    return _.omit<User>(user, ['password']) as User;
  }
}
