import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  name: string;
}
