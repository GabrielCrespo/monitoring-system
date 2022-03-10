import { Request, Response } from "express";
import CreateUserTypeService from "../services/CreateUserTypeService";
import DeleteUserTypeService from "../services/DeleteUserTypeService";
import ListUserTypeService from "../services/ListUserTypeService";
import ShowUserTypeService from "../services/ShowUserTypeService";
import UpdateUserTypeService from "../services/UpdateUserTypeService";

class UserTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserTypeService = new ListUserTypeService();

    const listUserType = await listUserTypeService.execute();

    return response.json(listUserType);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserTypeService = new ShowUserTypeService();

    const showUserType = await showUserTypeService.execute({
      id: Number.parseInt(id),
    });

    return response.json(showUserType);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;

    const createUserTypeService = new CreateUserTypeService();

    const createUserType = await createUserTypeService.execute({ descricao });

    return response.json(createUserType);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { descricao } = request.body;

    const updateUserTypeService = new UpdateUserTypeService();

    const updateUserType = await updateUserTypeService.execute({
      id: Number.parseInt(id),
      descricao,
    });

    return response.json(updateUserType);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserTypeService = new DeleteUserTypeService();

    await deleteUserTypeService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }
}

export default UserTypeController;
