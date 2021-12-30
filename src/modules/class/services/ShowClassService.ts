import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Class from "../typeorm/entities/Class";
import ClassRepository from "../typeorm/repositories/ClassRepository";

interface IRequest {
  id: number;
}

class ShowClassService {
  public async execute({ id }: IRequest): Promise<Class> {
    const classRepository = getCustomRepository(ClassRepository);

    const team = await classRepository.findOne(id);

    if (!team) {
      throw new AppError("A turma não foi encontrada!");
    }

    return team;
  }
}

export default ShowClassService;
