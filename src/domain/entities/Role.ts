import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    length: 50,
  })
  name!: string;

  @Column({
    nullable: true,
    length: 255,
  })
  description?: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
