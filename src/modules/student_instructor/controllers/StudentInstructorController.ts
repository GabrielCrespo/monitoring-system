import { Request, Response } from "express";
import CreateStudentInstructorService from "../services/CreateStudentInstructorService";
import ListStudentInstructorService from "../services/ListStudentInstructorService";
import ShowStudentInstructorService from "../services/ShowStudentInstructorService";

class StudentInstructorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStudentInstructorService = new ListStudentInstructorService();

    const studentsInstructors = await listStudentInstructorService.execute();

    return response.json(studentsInstructors);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showStudentInstructorService = new ShowStudentInstructorService();

    const studentInstructor = await showStudentInstructorService.execute({
      id: Number.parseInt(id),
    });

    return response.json(studentInstructor);
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
