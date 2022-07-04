import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import GenderRepository from "../typeorm/repository/GenderRepository";

interface IRequest {
  id: number;
}

class DeleteGenderService {
  public async execute({ id }: IRequest): Promise<void> {
    const genderRepository = getCustomRepository(GenderRepository);

    const gender = await genderRepository.findOne(id);

    if (!gender) {
      throw new AppError("O genêro não foi encontrado!");
    }

    await genderRepository.remove(gender);
  }
}

export default DeleteGenderService;
