import { getCustomRepository } from "typeorm";
import DayOfWeek from "../typeorm/entities/DayOfWeek";
import DayOfWeekRepository from "../typeorm/repositories/DayOfWeekRepository";

class ListDayOfWeekService {
  public async execute(): Promise<DayOfWeek[]> {
    const dayOfWeekRepository = getCustomRepository(DayOfWeekRepository);

    const daysOfWeek = await dayOfWeekRepository.find();

    return daysOfWeek;
  }
}

export default ListDayOfWeekService;
