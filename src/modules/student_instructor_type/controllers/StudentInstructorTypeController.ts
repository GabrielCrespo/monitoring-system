import { Request, Response } from "express";
import CreateStudentInstructorTypeService from "../services/CreateStudentInstructorTypeService";
import DeleteStudentInstructorTypeService from "../services/DeleteStudentInstructorTypeService";
import ListStudentInstructorTypeService from "../services/ListStudentInstructorTypeService";
import ShowStudentInstructorTypeService from "../services/ShowStudentInstructorTypeService";
import UpdateStudentInstructorTypeService from "../services/UpdateStudentInstructorTypeService";

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { descricao } = request.body;
    const updateStudentInstructorTypeService =
      new UpdateStudentInstructorTypeService();

    const studentInstructorType =
      await updateStudentInstructorTypeService.execute({
        id: Number.parseInt(id),
        descricao,
      });
    return response.json(studentInstructorType);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteStudentInstructorTypeService =
      new DeleteStudentInstructorTypeService();

    await deleteStudentInstructorTypeService.execute({
      id: Number.parseInt(id),
    });

    return response.json([]);
  }
}

export default StudentInstructorTypeController;
