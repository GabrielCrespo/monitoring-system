import { Request, Response } from "express";
import CreateStudentInstructorTypeService from "../services/CreateStudentInstructorTypeService";
import ListStudentInstructorTypeService from "../services/ListStudentInstructorTypeService";
import ShowStudentInstructorTypeService from "../services/ShowStudentInstructorTypeService";

class StudentInstructorTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStudentInstructorTypeService =
      new ListStudentInstructorTypeService();

    const studentInstructorTypes =
      await listStudentInstructorTypeService.execute();

    return response.json(studentInstructorTypes);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showStudentInstructorTypeService =
      new ShowStudentInstructorTypeService();

    const studentInstructorType =
      await showStudentInstructorTypeService.execute({
        id: Number.parseInt(id),
      });

    return response.json(studentInstructorType);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;
    const createStudentInstructorTypeService =
      new CreateStudentInstructorTypeService();

    const studentInstructorType =
      await createStudentInstructorTypeService.execute({
        descricao,
      });
    return response.json(studentInstructorType);
  }
}

export default StudentInstructorTypeController;
