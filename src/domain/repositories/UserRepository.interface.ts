import { Role } from '../entities/Role';
import { User } from '../entities/User';

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IUserRepository {
  findByEmail(email: string | string[]): Promise<User | null>;

  findById(id: string | string[]): Promise<User | null>;

  findAll(): Promise<User[]>;

  create(userData: CreateUserData): Promise<User>;

  update(id: string | string[], userData: UpdateUserData): Promise<User>;

  delete(id: string | string[]): Promise<void>;
}
