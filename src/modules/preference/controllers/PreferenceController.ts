import { Request, Response } from "express";
import CreatePreferenceService from "../services/CreatePreferenceService";
import DeletePreferenceService from "../services/DeletePreferenceService";
import UpdatePreferenceService from "../services/UpdatePreferenceService";

class PreferenceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { curso, genero, cota } = request.body;

    const createPreferenceService = new CreatePreferenceService();

    const preference = await createPreferenceService.execute({
      curso,
      genero,
      cota,
    });

    return response.json(preference);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { curso, genero, cota } = request.body;
    const updatePreferenceService = new UpdatePreferenceService();

    const preference = await updatePreferenceService.execute({
      id: Number.parseInt(id),
      curso,
      genero,
      cota,
    });

    return response.json(preference);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePreferenceService = new DeletePreferenceService();

    deletePreferenceService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }
}

export default PreferenceController;
