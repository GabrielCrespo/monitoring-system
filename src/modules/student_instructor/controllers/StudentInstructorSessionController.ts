import { Request, Response } from "express";
import CreateStudentInstructorSessionService from "../services/CreateStudentInstructorSessionService";

class StudentInstructorSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const studentInstructorSessionService =
      new CreateStudentInstructorSessionService();

    const user = await studentInstructorSessionService.execute({
      email,
      senha,
    });

    return response.json(user);
  }
}

export default StudentInstructorSessionController;
