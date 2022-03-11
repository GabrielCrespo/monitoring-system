import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface Irequest {
  id: number;
}

class ShowUserService {
  public async execute({ id }: Irequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("O usuário não foi encontrado!");
    }

    return user;
  }
}

export default ShowUserService;
