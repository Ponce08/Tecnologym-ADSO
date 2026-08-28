import { Request, Response } from 'express';
import { RegisterUser } from '../../../application/uses-cases/auth/register/RegisterUser-usecase';
import { LoginUser } from '../../../application/uses-cases/auth/login/LoginUser-usecase';

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.registerUser.execute(req.body);

    res.status(201).json({ success: true, result });
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.loginUser.execute(req.body);

    res.status(200).json({ success: true, result });
  };
}
