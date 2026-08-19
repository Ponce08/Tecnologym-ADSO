import jwt from 'jsonwebtoken';
import { env } from '../config/env';

import {
  ITokenService,
  TokenPayload,
} from '../../application/services/ITokenService';

export class TokenService implements ITokenService {
  private readonly jwtSecret = env.JWT_SECRET!;

  generate(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET!, {
      expiresIn: '1h',
    });
  }
  verify(token: string): TokenPayload {
    return jwt.verify(token, this.jwtSecret) as TokenPayload;
  }
}
