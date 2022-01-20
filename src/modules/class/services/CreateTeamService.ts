import DayOfWeek from "@modules/dayofweek/typeorm/entities/DayOfWeek";
import DayOfWeekRepository from "@modules/dayofweek/typeorm/repositories/DayOfWeekRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Team from "../typeorm/entities/Team";
import TeamRepository from "../typeorm/repositories/TeamRepository";

interface IRequest {
  descricao: string;
  hora_inicio: Date;
  hora_fim: Date;
  dias_da_semana: DayOfWeek[];
}

class CreateTeamService {
  public async execute({
    descricao,
    hora_inicio,
    hora_fim,
    dias_da_semana,
  }: IRequest): Promise<Team> {
    const classRepository = getCustomRepository(TeamRepository);
    const dayofweekRepository = getCustomRepository(DayOfWeekRepository);

    const descricaoExists = await classRepository.findByDescription(descricao);

    if (descricaoExists) {
      throw new AppError("A turma já está cadastrada!");
    }

    const existsDayOfTheWeek = await dayofweekRepository.findAllByIds(
      dias_da_semana
    );

    if (!existsDayOfTheWeek.length) {
      throw new AppError("Não foi possível encontrar os dias da semana!");
    }

    const existsDayOfTheWeekIds = existsDayOfTheWeek.map(
      (dayOfWeek) => dayOfWeek.id
    );

    const checkInexistentDayOfWeek = dias_da_semana.filter(
      (dayOfWeek) => !existsDayOfTheWeekIds.includes(dayOfWeek.id)
    );

    if (checkInexistentDayOfWeek.length) {
      throw new AppError(
        "Não foi possível encontrar algum dos dias da semana!"
      );
    }

    const team = classRepository.createTeam({
      descricao,
      hora_inicio,
      hora_fim,
      dias_da_semana,
    });

    return team;
  }
}

export default CreateTeamService;
