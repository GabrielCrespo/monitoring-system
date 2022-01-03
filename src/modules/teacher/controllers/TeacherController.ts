import { Request, Response } from "express";
import CreateTeacherService from "../services/CreateTeacherService";
import ListTeacherService from "../services/ListTeacherService";

class TeacherController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeacherService = new ListTeacherService();

    const teachers = await listTeacherService.execute();

    return response.json(teachers);
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
}

export default TeacherController;
