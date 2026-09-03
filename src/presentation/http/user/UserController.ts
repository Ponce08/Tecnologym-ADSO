import { Request, Response, NextFunction } from 'express';
import { GetUsers } from '../../../application/uses-cases/user/GetUsers';
import { GetUserById } from '../../../application/uses-cases/user/GetUserById';
import { UpdateUser } from '../../../application/uses-cases/user/UpdateUser';
import { DeleteUser } from '../../../application/uses-cases/user/DeleteUser';

export class UserController {
  constructor(
    private readonly getUsers: GetUsers,
    private readonly getUserById: GetUserById,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
  ) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.getUsers.execute();

    res.status(200).json(users);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await this.getUserById.execute(id);

    res.status(200).json(user);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await this.updateUser.execute(id, req.body);

    res.status(200).json(user);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await this.deleteUser.execute(id);

    res.status(204).send();
  };
}
