import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ClassRepository from "../typeorm/repositories/ClassRepository";

interface IRequest {
  id: number;
}
class DeleteClassService {
  public async execute({ id }: IRequest): Promise<void> {
    const classRepository = getCustomRepository(ClassRepository);

    const team = await classRepository.findOne(id);

    if (!team) {
      throw new AppError("A turma não foi encontrada!");
    }

    await classRepository.remove(team);
  }
}

export default DeleteClassService;
