import { getCustomRepository } from "typeorm";
import Class from "../typeorm/entities/Class";
import ClassRepository from "../typeorm/repositories/ClassRepository";

class ListClassService {
  public async execute(): Promise<Class[]> {
    const classRepository = getCustomRepository(ClassRepository);

    const teams = await classRepository.find();

    return teams;
  }
}

export default ListClassService;
