import { Request, Response } from "express";
import CreateTeacherService from "../services/CreateTeacherService";
import ListTeacherService from "../services/ListTeacherService";
import ShowTeacherService from "../services/ShowTeacherService";
import UpdateTeacherService from "../services/UpdateTeacherService";

class TeacherController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeacherService = new ListTeacherService();

    const teachers = await listTeacherService.execute();

    return response.json(teachers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTeacherService = new ShowTeacherService();

    const teacher = await showTeacherService.execute({
      id: Number.parseInt(id),
    });

    return response.json(teacher);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, senha, funcao, turma } = request.body;

    const createTeacherService = new CreateTeacherService();

    const teacher = await createTeacherService.execute({
      nome,
      email,
      senha,
      funcao,
      turma,
    });

    return response.json(teacher);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, email, senha, funcao, turma } = request.body;

    const updateTeacherService = new UpdateTeacherService();

    const teacher = await updateTeacherService.execute({
      id: Number.parseInt(id),
      nome,
      email,
      senha,
      funcao,
      turma,
    });

    return response.json(teacher);
  }
}

export default TeacherController;
