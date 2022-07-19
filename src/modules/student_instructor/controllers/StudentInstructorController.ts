import { Request, Response } from "express";
import CreateStudenteInstructorMonitoringTimeService from "../services/CreateStudenteInstructorMonitoringTimeService";
import CreateStudentInstructorService from "../services/CreateStudentInstructorService";
import DeleteStudentInstructorService from "../services/DeleteStudentInstructorService";
import ListStudentInstructorService from "../services/ListStudentInstructorService";
import ShowStudentInstructorService from "../services/ShowStudentInstructorService";
import UpdateStudentInstructorService from "../services/UpdateStudentInstructorService";

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
      tipo_instrutor,
      telefone,
      data_de_nascimento,
      curso,
      genero,
      cota,
    } = request.body;

    const createStudentInstructorService = new CreateStudentInstructorService();

    const studentInstructor = await createStudentInstructorService.execute({
      matricula,
      nome,
      email,
      senha,
      telefone,
      tipo_instrutor,
      data_de_nascimento,
      curso,
      genero,
      cota,
    });

    return response.json(studentInstructor);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      matricula,
      nome,
      email,
      senha,
      telefone,
      tipo_instrutor,
      data_de_nascimento,
      curso,
      genero,
      cota,
    } = request.body;
    const updateStudentInstructorService = new UpdateStudentInstructorService();

    const studentInstructor = await updateStudentInstructorService.execute({
      id: Number.parseInt(id),
      matricula,
      nome,
      email,
      senha,
      telefone,
      tipo_instrutor,
      data_de_nascimento,
      curso,
      genero,
      cota,
    });

    return response.json(studentInstructor);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStudentInstructorService = new DeleteStudentInstructorService();

    deleteStudentInstructorService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }

  public async createMonitoringTime(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { horarios_monitoria } = request.body;
    const { id } = request.params;

    const createStudenteInstructorMonitoringTimeService =
      new CreateStudenteInstructorMonitoringTimeService();

    const studentInstructor =
      await createStudenteInstructorMonitoringTimeService.execute({
        id: Number.parseInt(id),
        horarios_monitoria,
      });

    return response.json(studentInstructor);
  }
}

export default StudentInstructorController;
