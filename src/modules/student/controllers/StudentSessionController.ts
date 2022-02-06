import { Request, Response } from "express";
import CreateStudentSessionService from "../services/CreateStudentSessionService";

class StudentSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const studentSessionService = new CreateStudentSessionService();

    const user = await studentSessionService.execute({
      email,
      senha,
    });

    return response.json(user);
  }
}

export default StudentSessionController;
