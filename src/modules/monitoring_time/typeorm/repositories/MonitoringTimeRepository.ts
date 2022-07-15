import DayOfWeek from "@modules/dayofweek/typeorm/entities/DayOfWeek";
import { EntityRepository, Repository, Timestamp } from "typeorm";
import MonitoringTime from "../entities/MonitoringTime";

@EntityRepository(MonitoringTime)
class MonitoringTimeRepository extends Repository<MonitoringTime> {
  public async findById(id: number): Promise<MonitoringTime | undefined> {
    const monitoringTime = this.findOne({
      where: {
        id,
      },
    });
    return monitoringTime;
  }

  public async findByAll(
    dia_da_semana: DayOfWeek,
    hora_inicio: string,
    hora_fim: string
  ): Promise<MonitoringTime | undefined> {
    const monitoringTime = this.createQueryBuilder("m")
      .where(
        // `m.diaDaSemanaId = ${dia_da_semana.id} AND m.hora_inicio >= ${hora_inicio} AND m.hora_fim <= ${hora_fim}`
        "m.diaDaSemanaId = : diaDaSemanaId",
        { dia_da_semana: dia_da_semana.id }
      )
      .andWhere("m.hora_inicio = : hora_inicio", {
        hora_inicio: hora_inicio,
      })
      .andWhere("m.hora_fim = : hora_fim", {
        hora_fim: hora_fim,
      })
      .select()
      .getRawOne();

    return monitoringTime;
  }

  public async findByDayOfWeek(
    dia_da_semana: DayOfWeek
  ): Promise<MonitoringTime | undefined> {
    const monitoringTime = this.findOne({
      where: {
        dia_da_semana,
      },
    });
    return monitoringTime;
  }

  public async findByTimeBetween(
    hora_inicio: Date,
    hora_fim: Date
  ): Promise<MonitoringTime[] | undefined> {
    const monitoringTimes = this.createQueryBuilder("m")
      .where(`m.hora_inicio >= ${hora_inicio} AND m.hora_fim <= ${hora_fim}`)
      .select()
      .getMany();
    return monitoringTimes;
  }

  public async findByTime(
    hora_inicio: Date,
    hora_fim: Date
  ): Promise<MonitoringTime | undefined> {
    const monitoringTime = this.createQueryBuilder("m")
      .where(`m.hora_inicio = ${hora_inicio} AND m.hora_fim = ${hora_fim}`)
      .select()
      .getRawOne();
    return monitoringTime;
  }

  public async findByStartTime(
    hora_inicio: Date
  ): Promise<MonitoringTime | undefined> {
    const monitoringTime = this.createQueryBuilder("m")
      .where(`m.hora_inicio = ${hora_inicio}`)
      .select()
      .getRawOne();
    return monitoringTime;
  }

  public async findByEndTime(
    hora_fim: Date
  ): Promise<MonitoringTime[] | undefined> {
    const monitoringTime = this.createQueryBuilder("m")
      .where(`m.hora_fim= ${hora_fim}`)
      .select()
      .getRawOne();
    return monitoringTime;
  }
}

export default MonitoringTimeRepository;
