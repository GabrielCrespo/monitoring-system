import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Team from "../typeorm/entities/Team";
import TeamRepository from "../typeorm/repositories/TeamRepository";

interface IRequest {
  id: number;
}

class ShowTeamService {
  public async execute({ id }: IRequest): Promise<Team> {
    const teamRepository = getCustomRepository(TeamRepository);

    const team = await teamRepository.findOne(id);

    if (!team) {
      throw new AppError("A turma não foi encontrada!");
    }

    return team;
  }
}

export default ShowTeamService;
