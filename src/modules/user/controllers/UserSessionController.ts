import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import CreateUserSessionService from "../services/CreateUserSessionService";
import User from "../typeorm/entities/User";

class UserSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const createUserSessionService = new CreateUserSessionService();

    const user = await createUserSessionService.execute({ email, senha });

    return response.json(plainToClass(User, user));
  }
}

export default UserSessionController;
