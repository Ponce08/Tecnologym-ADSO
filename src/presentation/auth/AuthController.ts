import { Request, Response } from 'express';
import { LoginUser } from '../../application/uses-cases/auth/login/LoginUser-usecase';
import { CreateUser } from '../../application/uses-cases/admin/CreateUser-usecase';

export class AuthController {
  constructor(
    private readonly registerUser: CreateUser,
    private readonly loginUser: LoginUser,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.registerUser.execute({
      ...req.body,
      roleName: 'Cliente',
    });

    res.status(201).json({ success: true, result });
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.loginUser.execute(req.body);

    res.status(200).json({ success: true, result });
  };
}
