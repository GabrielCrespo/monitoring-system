import { Request, Response } from "express";
import CreateClassService from "../services/CreateClassService";
import DeleteClassService from "../services/DeleteClassService";
import ListClassService from "../services/ListClassService";
import ShowClassService from "../services/ShowClassService";
import UpdateClassService from "../services/UpdateClassService";

class ClassController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClassService = new ListClassService();

    const classes = await listClassService.execute();

    return response.json(classes);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showClassService = new ShowClassService();

    const team = await showClassService.execute({ id: Number.parseInt(id) });

    return response.json(team);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao, hora_inicio, hora_fim, dias_da_semana } = request.body;

    const createClassSercive = new CreateClassService();

    const team = await createClassSercive.execute({
      descricao,
      hora_inicio,
      hora_fim,
      dias_da_semana,
    });

    return response.json(team);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { descricao, hora_inicio, hora_fim, dias_da_semana } = request.body;

    const updateClassService = new UpdateClassService();

    const team = await updateClassService.execute({
      id: Number.parseInt(id),
      descricao,
      hora_inicio,
      hora_fim,
      dias_da_semana,
    });

    return response.json(team);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClassService = new DeleteClassService();

    await deleteClassService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }
}

export default ClassController;
