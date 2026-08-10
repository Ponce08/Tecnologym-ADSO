import { JwtPayload } from 'jsonwebtoken';
// import { AuthPayload } from './AuthPayload';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};

// import { AuthPayload } from './AuthPayload';

// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: AuthPayload;
//   }
// }
