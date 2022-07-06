import Team from "@modules/class/typeorm/entities/Team";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";
import bcrypt from "bcryptjs";
import TeamRepository from "@modules/class/typeorm/repositories/TeamRepository";
import UserRepository from "@modules/user/typeorm/repositories/UserRepository";
import UserTypeRepository from "@modules/user_type/typeorm/repositories/UserTypeRepository";
import UpdateUserService from "@modules/user/services/UpdateUserService";

interface IRequest {
  id: number;
  nome: string;
  email: string;
  senha: string;
  turma: Team;
}

class UpdateTeacherService {
  public async execute({
    id,
    nome,
    email,
    senha,
    turma,
  }: IRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(TeacherRepository);
    const teamRepository = getCustomRepository(TeamRepository);
    const userRepository = getCustomRepository(UserRepository);
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const teacher = await teacherRepository.findById(id);

    if (!teacher) {
      throw new AppError("Professor não encontrado!");
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists && teacher.usuario.email != email) {
      throw new AppError("O email já está cadastrado!");
    }

    const classExists = await teacherRepository.findByClass(turma);

    if (classExists && teacher.turma.id != turma.id) {
      throw new AppError("Já há um professor cadastrado para essa turma!");
    }

    const teamExists = await teamRepository.findById(turma.id);

    if (!teamExists) {
      throw new AppError("Não foi possível encontrar a turma");
    }

    const userType = await userTypeRepository.findByDescription("Professor");

    const user = await new UpdateUserService().execute({
      id: teacher.usuario.id,
      email,
      senha,
      eh_admin: teacher.usuario.eh_admin,
      tipo_usuario: userType!,
    });

    teacher.nome = nome;
    teacher.usuario = user;
    teacher.turma = turma;

    await teacherRepository.save(teacher);

    return teacher;
  }
}

export default UpdateTeacherService;
