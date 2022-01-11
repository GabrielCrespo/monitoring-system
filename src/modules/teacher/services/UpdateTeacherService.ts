import Team from "@modules/class/typeorm/entities/Team";
import Role from "@modules/roles/typeorm/entities/Role";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";
import bcrypt from "bcrypt";
import RolesRepository from "@modules/roles/typeorm/repositories/RolesRepository";
import TeamRepository from "@modules/class/typeorm/repositories/TeamRepository";

interface IRequest {
  id: number;
  nome: string;
  email: string;
  senha: string;
  funcao: Role;
  turma: Team;
}

class UpdateTeacherService {
  public async execute({
    id,
    nome,
    email,
    senha,
    funcao,
    turma,
  }: IRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(TeacherRepository);
    const roleRepository = getCustomRepository(RolesRepository);
    const teamRepository = getCustomRepository(TeamRepository);

    const teacher = await teacherRepository.findById(id);

    if (!teacher) {
      throw new AppError("Professor não encontrado!");
    }

    const emailExists = await teacherRepository.findByEmail(email);

    if (emailExists && teacher.email != email) {
      throw new AppError("O email já está cadastrado!");
    }

    const classExists = await teacherRepository.findByClass(turma);

    if (classExists && teacher.turma.id != turma.id) {
      throw new AppError("Já há um professor cadastrado para essa turma!");
    }

    const roleExists = await roleRepository.findById(funcao.id);

    if (!roleExists) {
      throw new AppError("Não foi possível encontrar a função");
    }

    const teamExists = await teamRepository.findById(turma.id);

    if (!teamExists) {
      throw new AppError("Não foi possível encontrar a turma");
    }

    const hashedSenha = await bcrypt.hash(senha, 8);

    teacher.nome = nome;
    teacher.email = email;
    teacher.senha = hashedSenha;
    teacher.funcao = funcao;
    teacher.turma = turma;

    await teacherRepository.save(teacher);

    return teacher;
  }
}

export default UpdateTeacherService;
