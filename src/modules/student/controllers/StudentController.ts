import { Request, Response } from "express";
import CreateStudentService from "../services/CreateStudentService";
import ListStudentService from "../services/ListStudentService";

class StudentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStudentService = new ListStudentService();

    const students = await listStudentService.execute();

    return response.json(students);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { matricula, nome, data_de_nascimento, email, senha, curso, turma } =
      request.body;
    const createStudentService = new CreateStudentService();

    const student = await createStudentService.execute({
      matricula,
      nome,
      data_de_nascimento,
      email,
      senha,
      curso,
      turma,
    });
    return response.json(student);
  }
}

export default StudentController;
