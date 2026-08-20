import { Role } from '../entities/Role';
import { User } from '../entities/User';

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;

  create(userData: CreateUserData): Promise<User>;
}
