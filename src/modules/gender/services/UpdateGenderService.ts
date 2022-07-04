import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Gender from "../typeorm/entities/Gender";
import GenderRepository from "../typeorm/repository/GenderRepository";

interface IRequest {
  id: number;
  descricao: string;
}

class UpdateGenderService {
  public async execute({ id, descricao }: IRequest): Promise<Gender> {
    const genderRepository = getCustomRepository(GenderRepository);

    const gender = await genderRepository.findOne(id);

    if (!gender) {
      throw new AppError("O gênero não foi encontrado!");
    }

    const descricaoExists = await genderRepository.findByDescription(descricao);

    if (descricaoExists && gender.descricao !== descricao) {
      throw new AppError("Já existe um gênero cadastrado com essa descrição!");
    }

    gender.descricao = descricao;

    await genderRepository.save(gender);

    return gender;
  }
}

export default UpdateGenderService;
