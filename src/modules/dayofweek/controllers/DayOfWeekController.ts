import { Request, Response } from "express";
import CreateDayOfWeekService from "../services/CreateDayOfWeekService";
import ListDayOfWeekService from "../services/ListDayOfWeekService";
import ShowDayOfWeekService from "../services/ShowDayOfWeekService";

class DayOfWeekController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDayOfWeekService = new ListDayOfWeekService();

    const daysOfWeek = await listDayOfWeekService.execute();

    return response.json(daysOfWeek);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showDayOfWeekService = new ShowDayOfWeekService();

    const dayOfWeek = await showDayOfWeekService.execute({
      id: Number.parseInt(id),
    });

    return response.json(dayOfWeek);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;

    const createDayOfWeekService = new CreateDayOfWeekService();

    const dayOfWeek = await createDayOfWeekService.execute({ descricao });

    return response.json(dayOfWeek);
  }
}

export default DayOfWeekController;
