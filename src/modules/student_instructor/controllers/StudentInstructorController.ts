import { Request, Response } from "express";
import CreateStudentInstructorService from "../services/CreateStudentInstructorService";
import ListStudentInstructorService from "../services/ListStudentInstructorService";

class StudentInstructorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStudentInstructorService = new ListStudentInstructorService();

    const studentsInstructors = await listStudentInstructorService.execute();

    return response.json(studentsInstructors);
  }
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
