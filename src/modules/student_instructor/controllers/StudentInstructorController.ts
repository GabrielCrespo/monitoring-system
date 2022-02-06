import { Request, Response } from "express";
import CreateStudentInstructorService from "../services/CreateStudentInstructorService";

class StudentInstructorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      matricula,
      nome,
      email,
      senha,
      data_de_nascimento,
      tipo_aluno_instrutor,
      curso,
    } = request.body;

    const createStudentInstructorService = new CreateStudentInstructorService();

    const studentInstructor = await createStudentInstructorService.execute({
      matricula,
      nome,
      email,
      senha,
      data_de_nascimento,
      tipo_aluno_instrutor,
      curso,
    });

    return response.json(studentInstructor);
  }
}

export default StudentInstructorController;
