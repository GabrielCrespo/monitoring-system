import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import PreferenceRepository from "../typeorm/repositories/PreferenceRepository";

interface IRequest {
  id: number;
}

class DeletePreferenceService {
  public async execute({ id }: IRequest): Promise<void> {
    const preferenceRepository = getCustomRepository(PreferenceRepository);

    const preference = await preferenceRepository.findById(id);

    if (!preference) {
      throw new AppError("O aluno instrutor não foi encontrado!");
    }

    await preferenceRepository.remove(preference);
  }
}

export default DeletePreferenceService;
