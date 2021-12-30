import { Request, Response } from "express";
import CreateClassService from "../services/CreateClassService";

class ClassController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao, hora_inicio, hora_fim, dias_da_semana } = request.body;

    const createClassSercive = new CreateClassService();

    //console.log(descricao, hora_inicio, hora_fim, dias_da_semana);

    const team = await createClassSercive.execute({
      descricao,
      hora_inicio,
      hora_fim,
      dias_da_semana,
    });

    return response.json(team);
  }
}

export default ClassController;
