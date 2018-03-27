import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

import { User } from '../users/user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(type => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
