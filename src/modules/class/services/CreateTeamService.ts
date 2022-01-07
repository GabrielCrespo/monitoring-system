import DayOfWeek from "@modules/dayofweek/typeorm/entities/DayOfWeek";
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

    const descricaoExists = await classRepository.findByDescription(descricao);

    if (descricaoExists) {
      throw new AppError("A turma já está cadastrada!");
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
