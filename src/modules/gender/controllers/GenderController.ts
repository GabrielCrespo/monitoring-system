import { Request, Response } from "express";
import CreateGenderService from "../services/CreateGenderService";
import DeleteGenderService from "../services/DeleteGenderService";
import ListGenderService from "../services/ListGenderService";
import ShowGenderService from "../services/ShowGenderService";
import UpdateGenderService from "../services/UpdateGenderService";

class GenderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listGenderService = new ListGenderService();

    const gender = await listGenderService.execute();

    return response.json(gender);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showGenderService = new ShowGenderService();

    const gender = await showGenderService.execute({ id: Number.parseInt(id) });

    return response.json(gender);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;

    const createGenderService = new CreateGenderService();

    const gender = await createGenderService.execute({ descricao });

    return response.json(gender);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;
    const { id } = request.params;

    const updateGenderService = new UpdateGenderService();

    const gender = await updateGenderService.execute({
      id: Number.parseInt(id),
      descricao,
    });

    return response.json(gender);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteGenderService = new DeleteGenderService();

    await deleteGenderService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }
}

export default GenderController;
