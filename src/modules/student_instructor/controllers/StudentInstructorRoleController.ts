import { Request, Response } from "express";
import UpdateStudentInstructorRoleService from "../services/UpdateStudentInstructorRoleService";

class StudentInstructorRoleController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { funcao } = request.body;

    const updateStudentInstructorRoleService =
      new UpdateStudentInstructorRoleService();

    const studentInstructor = await updateStudentInstructorRoleService.execute({
      id: Number.parseInt(id),
      funcao,
    });

    return response.json(studentInstructor);
  }
}

export default StudentInstructorRoleController;
