import DayOfWeek from "@modules/dayofweek/typeorm/entities/DayOfWeek";
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

    const team = await teamRepository.findOne(id);

    if (!team) {
      throw new AppError("A turma não foi encontrada!");
    }

    const descricaoExists = await teamRepository.findByDescription(descricao);

    if (descricaoExists && team.descricao !== descricao) {
      throw new AppError("A turma já está cadastrada!");
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
