import { JwtPayload } from 'jsonwebtoken';

export interface AuthPayload extends JwtPayload {
  sub: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: AuthPayload;
    }
  }
}

export {};
