import { Request, Response } from "express";
import CreateQuotaService from "../services/CreateQuotaService";
import DeleteQuotaService from "../services/DeleteQuotaService";
import ListQuotaService from "../services/ListQuotaService";
import ShowQuotaService from "../services/ShowQuotaService";
import UpdateQuotaService from "../services/UpdateQuotaService";

class QuotaController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listQuotaService = new ListQuotaService();

    const quotas = await listQuotaService.execute();

    return response.json(quotas);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showQuotaService = new ShowQuotaService();

    const quota = await showQuotaService.execute({ id: Number.parseInt(id) });

    return response.json(quota);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;

    const createQuotaService = new CreateQuotaService();

    const quota = await createQuotaService.execute({ descricao });

    return response.json(quota);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;
    const { id } = request.params;

    const updateQuotaService = new UpdateQuotaService();

    const quota = await updateQuotaService.execute({
      id: Number.parseInt(id),
      descricao,
    });

    return response.json(quota);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteQuotaService = new DeleteQuotaService();

    await deleteQuotaService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }
}

export default QuotaController;
