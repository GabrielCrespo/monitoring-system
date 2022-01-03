import Class from "@modules/class/typeorm/entities/Class";
import Role from "@modules/roles/typeorm/entities/Role";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";
import bcrypt from "bcrypt";

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  funcao: Role;
  turma: Class;
}

class CreateTeacherService {
  public async execute({
    nome,
    email,
    senha,
    funcao,
    turma,
  }: IRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const emailExists = await teacherRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("O email já está cadastrado!");
    }

    const classExists = await teacherRepository.findByClass(turma);

    if (classExists) {
      throw new AppError(
        "Já há um professor cadastrado para a turma selecionada!"
      );
    }

    const senhaHash = await bcrypt.hash(senha, 8);

    const teacher = teacherRepository.create({
      nome,
      email,
      senha: senhaHash,
      funcao,
      turma,
    });

    await teacherRepository.save(teacher);

    return teacher;
  }
}

export default CreateTeacherService;
