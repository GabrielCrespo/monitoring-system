import DayOfWeek from "@modules/dayofweek/typeorm/entities/DayOfWeek";
import DayOfWeekRepository from "@modules/dayofweek/typeorm/repositories/DayOfWeekRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Team from "../typeorm/entities/Team";
import TeamRepository from "../typeorm/repositories/TeamRepository";

interface IRequest {
  id: number;
  descricao: string;
  hora_inicio: Date;
  hora_fim: Date;
  dias_da_semana: DayOfWeek[],
}

class UpdateTeamService {
  public async execute({
    id,
    descricao,
    hora_inicio,
    hora_fim,
    dias_da_semana,
  }: IRequest): Promise<Team> {
    const teamRepository = getCustomRepository(TeamRepository);
    const dayofweekRepository = getCustomRepository(DayOfWeekRepository);

    const team = await teamRepository.findOne(id);

    if (!team) {
      throw new AppError("A turma não foi encontrada!");
    }

    const descricaoExists = await teamRepository.findByDescription(descricao);

    if (descricaoExists && team.descricao !== descricao) {
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
      throw new AppError("Não foi possível encontrar algum dos dias da semana!");
    }

    team.descricao = descricao;
    team.hora_inicio = hora_inicio;
    team.hora_fim = hora_fim;
    team.dias_da_semana = dias_da_semana;

    await teamRepository.save(team);

    return team;
  }
}

export default UpdateTeamService;
