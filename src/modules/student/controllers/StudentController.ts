import { Request, Response } from "express";
import CreateStudentService from "../services/CreateStudentService";
import DeleteStudentService from "../services/DeleteStudentService";
import ListStudentService from "../services/ListStudentService";
import ShowStudentService from "../services/ShowStudentService";
import UpdateStudentService from "../services/UpdateStudentService";

class StudentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStudentService = new ListStudentService();

    const students = await listStudentService.execute();

    return response.json(students);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showStudentService = new ShowStudentService();

    const student = await showStudentService.execute({
      id: Number.parseInt(id),
    });

    return response.json(student);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      matricula,
      nome,
      data_de_nascimento,
      email,
      senha,
      telefone,
      idade,
      ehCotista,
      curso,
      turma,
      genero,
    } = request.body;
    const createStudentService = new CreateStudentService();

    const student = await createStudentService.execute({
      matricula,
      nome,
      data_de_nascimento,
      email,
      senha,
      telefone,
      idade,
      ehCotista,
      genero,
      curso,
      turma,
    });
    return response.json(student);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      matricula,
      nome,
      data_de_nascimento,
      email,
      senha,
      idade,
      telefone,
      ehCotista,
      curso,
      turma,
      genero,
    } = request.body;
    const updateStudentService = new UpdateStudentService();

    const student = await updateStudentService.execute({
      id: Number.parseInt(id),
      matricula,
      nome,
      data_de_nascimento,
      email,
      senha,
      idade,
      telefone,
      ehCotista,
      curso,
      turma,
      genero,
    });
    return response.json(student);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteStudentService = new DeleteStudentService();

    await deleteStudentService.execute({
      id: Number.parseInt(id),
    });

    return response.json([]);
  }
}
export default StudentController;
