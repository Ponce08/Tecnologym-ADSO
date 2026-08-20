import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { RoleEntity } from './RoleEntity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column({
    length: 100,
  })
  lastName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    default: true,
  })
  active!: boolean;

  @Column()
  roleId!: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role?: RoleEntity;
}
