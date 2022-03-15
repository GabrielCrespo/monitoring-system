import { Request, Response } from "express";
import CreateUserSessionService from "../services/CreateUserSessionService";

class UserSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const createUserSessionService = new CreateUserSessionService();

    const user = await createUserSessionService.execute({ email, senha });

    return response.json(user);
  }
}

export default UserSessionController;
