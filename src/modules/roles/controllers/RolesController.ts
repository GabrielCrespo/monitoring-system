import { Request, Response } from "express";
import CreateRoleService from "../services/CreateRoleService";
import DeleteRoleService from "../services/DeleteRoleService";
import ListRoleService from "../services/ListRoleService";
import ShowRoleService from "../services/ShowRoleService";
import UpdateRoleService from "../services/UpdateRoleService";

class RolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRoleService = new ListRoleService();

    const roles = await listRoleService.execute();

    return response.json(roles);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showRoleService = new ShowRoleService();

    const role = await showRoleService.execute({ id: Number.parseInt(id) });

    return response.json(role);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;

    const createRoleService = new CreateRoleService();

    const role = await createRoleService.execute({ descricao });

    return response.json(role);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { descricao } = request.body;

    const updateRoleService = new UpdateRoleService();

    const role = await updateRoleService.execute({
      id: Number.parseInt(id),
      descricao,
    });

    return response.json(role);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRoleService = new DeleteRoleService();

    await deleteRoleService.execute({ id: Number.parseInt(id) });

    return response.json([])
  }
}

export default RolesController;
