import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Class from "../typeorm/entities/Class";
import ClassRepository from "../typeorm/repositories/ClassRepository";

interface IRequest {
  id: number;
  descricao: string;
  hora_inicio: Date;
  hora_fim: Date;
}

class UpdateClassService {
  public async execute({
    id,
    descricao,
    hora_inicio,
    hora_fim,
  }: IRequest): Promise<Class> {
    const classRepository = getCustomRepository(ClassRepository);

    const team = await classRepository.findOne(id);

    if (!team) {
      throw new AppError("A turma não foi encontrada!");
    }

    const descricaoExists = await classRepository.findByDescription(descricao);

    if (descricaoExists && team.descricao !== descricao) {
      throw new AppError("A turma já está cadastrada!");
    }

    team.descricao = descricao;
    team.hora_inicio = hora_inicio;
    team.hora_fim = hora_fim;

    await classRepository.save(team);

    return team;
  }
}

export default UpdateClassService;
