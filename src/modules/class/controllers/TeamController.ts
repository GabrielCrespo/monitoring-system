import { Request, Response } from "express";
import CreateTeamService from "../services/CreateTeamService";
import DeleteTeamService from "../services/DeleteTeamService";
import ListTeamService from "../services/ListTeamService";
import ShowTeamService from "../services/ShowTeamService";
import UpdateTeamService from "../services/UpdateTeamService";

class TeamController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeamService = new ListTeamService();

    const classes = await listTeamService.execute();

    return response.json(classes);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTeamService = new ShowTeamService();

    const team = await showTeamService.execute({ id: Number.parseInt(id) });

    return response.json(team);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao, hora_inicio, hora_fim, dias_da_semana } = request.body;

    const createClassSercive = new CreateTeamService();

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

    const updateTeamService = new UpdateTeamService();

    const team = await updateTeamService.execute({
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

    const deleteTeamService = new DeleteTeamService();

    await deleteTeamService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }
}

export default TeamController;
