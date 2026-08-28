// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { Role } from './Role';

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column({
//     length: 100,
//   })
//   firstName!: string;

//   @Column({
//     length: 100,
//   })
//   lastName!: string;

//   @Column({
//     unique: true,
//   })
//   email!: string;

//   @Column()
//   password!: string;

//   @Column({
//     default: true,
//   })
//   active!: boolean;

//   @Column({
//     type: 'timestamp',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   createdAt!: Date;

//   @ManyToOne(() => Role, (role) => role.users)
//   @JoinColumn({
//     name: 'role_id',
//   })
//   role!: Role;
// }

export class User {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public active: boolean,
    public role?: string,
  ) {}
}
