import { Request, Response } from "express";
import CreateStudentService from "../services/CreateStudentService";

class StudentController {
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
