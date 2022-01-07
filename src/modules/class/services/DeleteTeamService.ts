import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import TeamRepository from "../typeorm/repositories/TeamRepository";

interface IRequest {
  id: number;
}
class DeleteTeamService {
  public async execute({ id }: IRequest): Promise<void> {
    const teamRepository = getCustomRepository(TeamRepository);

    const team = await teamRepository.findOne(id);

    if (!team) {
      throw new AppError("A turma não foi encontrada!");
    }

    await teamRepository.remove(team);
  }
}

export default DeleteTeamService;
