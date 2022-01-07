import { Request, Response } from "express";
import CreateTeacherSessionService from "../services/CreateTeacherSessionService";

class TeacherSessionController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, senha } = request.body;

        const createTeacherSessionService = new CreateTeacherSessionService();

        const user = await createTeacherSessionService.execute({ email, senha });

        return response.json(user);
    }
}

export default TeacherSessionController;