import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Gender from "../typeorm/entities/Gender";
import GenderRepository from "../typeorm/repository/GenderRepository";

interface IRequest {
  id: number;
}

class ShowGenderService {
  public async execute({ id }: IRequest): Promise<Gender> {
    const genderRepository = getCustomRepository(GenderRepository);

    const gender = await genderRepository.findOne(id);

    if (!gender) {
      throw new AppError("O genêro não foi encontrado!");
    }

    return gender;
  }
}

export default ShowGenderService;
