import { getCustomRepository } from "typeorm";
import Team from "../typeorm/entities/Team";
import TeamRepository from "../typeorm/repositories/TeamRepository";

class ListTeamService {
  public async execute(): Promise<Team[]> {
    const teamRepository = getCustomRepository(TeamRepository);

    const teams = await teamRepository.find();

    return teams;
  }
}

export default ListTeamService;
