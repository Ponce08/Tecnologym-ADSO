import { Role } from '../entities/Role';
import { User } from '../entities/User';

// User(register and login)
export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginUserDomain {
  email: string;
  password: string;
}

// User(update)
export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

// Create user(Admin)
export interface CreateUserData extends Omit<RegisterUserData, 'role'> {
  roleName: string;
}

export interface IUserRepository {
  findByEmail(email: string | string[]): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  create(userData: RegisterUserData): Promise<User>;

  update(id: string, userData: UpdateUserData): Promise<User | null>;

  delete(id: string): Promise<void>;
}
