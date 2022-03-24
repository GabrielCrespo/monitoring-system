import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
interface IRequest {
  email: string;
  senha: string;
}

class CreateUserSessionService {
  public async execute({ email, senha }: IRequest): Promise<string> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const confirmedPassword = await bcrypt.compare(senha, user.senha);

    if (!confirmedPassword) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const userPayload: Partial<User> = {
      id: user.id,
      eh_admin: user.eh_admin,
      email: user.email,
    };

    const token = sign(userPayload, auth.jwt.secret, {
      subject: user.id.toString(),
      expiresIn: auth.jwt.expiresIn,
    });

    return token;
  }
}

export default CreateUserSessionService;
