import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import DayOfWeek from "../typeorm/entities/DayOfWeek";
import DayOfWeekRepository from "../typeorm/repositories/DayOfWeekRepository";

interface IRequest {
  id: number;
}

class ShowDayOfWeekService {
  public async execute({ id }: IRequest): Promise<DayOfWeek> {
    const dayOfWeekRepository = getCustomRepository(DayOfWeekRepository);

    const dayOfWeek = await dayOfWeekRepository.findById(id);

    if (!dayOfWeek) {
      throw new AppError("O dia da semana não existe!");
    }

    return dayOfWeek;
  }
}

export default ShowDayOfWeekService;
