import AppError from "@shared/errors/AppError";
import { getCustomRepository, getRepository } from "typeorm";
import DayOfWeek from "../typeorm/entities/DayOfWeek";
import DayOfWeekRepository from "../typeorm/repositories/DayOfWeekRepository";

interface IRequest {
  descricao: string;
}

class CreateDayOfWeekService {
  public async execute({ descricao }: IRequest): Promise<DayOfWeek> {
    const dayOfWeekRepository = getCustomRepository(DayOfWeekRepository);

    const dayOfWeekExists = await dayOfWeekRepository.findByDescription(
      descricao
    );

    if (dayOfWeekExists) {
      throw new AppError("O dia da semana já está cadastrado!");
    }

    const dayOfWeek = dayOfWeekRepository.create({
      descricao,
    });

    await dayOfWeekRepository.save(dayOfWeek);

    return dayOfWeek;
  }
}

export default CreateDayOfWeekService;
