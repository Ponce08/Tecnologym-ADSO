import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthPayload } from '../types/AuthPayload';

/**
 * Información que almacenaremos dentro del JWT.
 */
export interface TokenPayload {
  sub: string;

  email: string;

  role: string;
}

/**
 * Genera un JWT firmado.
 *
 * @param payload Información que viajará dentro del token.
 * @returns Token JWT.
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as SignOptions);
}

/**
 * Verifica la autenticidad de un JWT.
 *
 * @param token Token enviado por el cliente.
 * @returns Payload decodificado.
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
