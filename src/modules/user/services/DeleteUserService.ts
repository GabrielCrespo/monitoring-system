import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";

interface Irequest {
  id: number;
}

class DeleteUserService {
  public async execute({ id }: Irequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("O email já está cadastrado!");
    }

    await userRepository.remove(user);
  }
}

export default DeleteUserService;
