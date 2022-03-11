import ShowUserTypeService from "@modules/user_type/services/ShowUserTypeService";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = new ShowUserService();

    const user = await showUserService.execute({
      id: Number.parseInt(id),
    });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha, tipo_usuario } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      email,
      senha,
      tipo_usuario,
    });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email, senha, eh_admin, tipo_usuario } = request.body;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id: Number.parseInt(id),
      email,
      senha,
      eh_admin,
      tipo_usuario,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute({
      id: Number.parseInt(id),
    });

    return response.json([]);
  }
}

export default UserController;
