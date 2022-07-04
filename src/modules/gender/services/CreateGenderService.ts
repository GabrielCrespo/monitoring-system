import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Gender from "../typeorm/entities/Gender";
import GenderRepository from "../typeorm/repository/GenderRepository";

interface IRequest {
  descricao: string;
}

class CreateGenderService {
  public async execute({ descricao }: IRequest): Promise<Gender> {
    const genderRepository = getCustomRepository(GenderRepository);

    const genderExists = await genderRepository.findByDescription(descricao);

    if (genderExists) {
      throw new AppError("Esse gênero já está cadastrado");
    }

    const gender = genderRepository.create({
      descricao,
    });

    await genderRepository.save(gender);

    return gender;
  }
}

export default CreateGenderService;
