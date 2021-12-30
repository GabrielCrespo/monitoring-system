import DayOfWeek from "@modules/dayofweek/typeorm/entities/DayOfWeek";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Class from "../typeorm/entities/Class";
import ClassRepository from "../typeorm/repositories/ClassRepository";

interface IRequest {
  descricao: string;
  hora_inicio: Date;
  hora_fim: Date;
  dias_da_semana: DayOfWeek[];
}

class CreateClassService {
  public async execute({
    descricao,
    hora_inicio,
    hora_fim,
    dias_da_semana,
  }: IRequest): Promise<Class> {
    const classRepository = getCustomRepository(ClassRepository);

    const descricaoExists = await classRepository.findByDescription(descricao);

    if (descricaoExists) {
      throw new AppError("A turma já está cadastrada!");
    }

    const team = classRepository.createClass({
      descricao,
      hora_inicio,
      hora_fim,
      dias_da_semana,
    });

    return team;
  }
}

export default CreateClassService;
