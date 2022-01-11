import { EntityRepository, In, Repository } from "typeorm";
import DayOfWeek from "../entities/DayOfWeek";

interface IFindDaysOfWeek {
  id: number;
}

@EntityRepository(DayOfWeek)
class DayOfWeekRepository extends Repository<DayOfWeek> {
  public async findById(id: number): Promise<DayOfWeek | undefined> {
    const dayOfWeek = this.findOne({
      where: {
        id,
      },
    });
    return dayOfWeek;
  }

  public async findAllByIds(
    daysOfWeek: IFindDaysOfWeek[]
  ): Promise<DayOfWeek[]> {
    const daysOfWeekIds = daysOfWeek.map((dayOfWeek) => dayOfWeek.id);
    const existsDaysOfWeek = await this.find({
      where: {
        id: In(daysOfWeekIds),
      },
    });
    return existsDaysOfWeek;
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
