import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { UserEntity } from './UserEntity';

@Entity('roles')
export class RoleEntity {
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

  @OneToMany(() => UserEntity, (user) => user.role)
  users!: UserEntity[];
}
