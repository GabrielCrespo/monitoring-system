import { EntityRepository, Repository } from "typeorm";
import DayOfWeek from "../entities/DayOfWeek";

@EntityRepository(DayOfWeek)
class DayOfWeekRepository extends Repository<DayOfWeek> {
  public async findById(
    id: number
  ): Promise<DayOfWeek | undefined> {
    const dayOfWeek = this.findOne({
      where: {
        id,
      },
    });
    return dayOfWeek;
  }

  public async findByDescription(
    descricao: string
  ): Promise<DayOfWeek | undefined> {
    const dayOfWeek = this.findOne({
      where: {
        descricao,
      },
    });
    return dayOfWeek;
  }
}

export default DayOfWeekRepository;
