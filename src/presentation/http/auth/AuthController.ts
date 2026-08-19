import { Request, Response } from 'express';

import { LoginUser } from '../../../application/uses-cases/auth/login/LoginUser';
import { RegisterUser } from '../../../application/uses-cases/auth/register/RegisterUser';

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.registerUser.execute(req.body);

    res.status(201).json(result);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.loginUser.execute(req.body);

    res.status(200).json(result);
  };
}
