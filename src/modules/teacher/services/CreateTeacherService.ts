import Team from "@modules/class/typeorm/entities/Team";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";
import TeamRepository from "@modules/class/typeorm/repositories/TeamRepository";
import UserTypeRepository from "@modules/user_type/typeorm/repositories/UserTypeRepository";
import UserRepository from "@modules/user/typeorm/repositories/UserRepository";
import CreateUserService from "@modules/user/services/CreateUserService";

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  turma: Team;
}

class CreateTeacherService {
  public async execute({
    nome,
    email,
    senha,
    turma,
  }: IRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(TeacherRepository);
    const teamRepository = getCustomRepository(TeamRepository);
    const userRepository = getCustomRepository(UserRepository);
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("O email já está cadastrado!");
    }

    const classExists = await teacherRepository.findByClass(turma);

    if (classExists) {
      throw new AppError("Já há um professor cadastrado para essa turma!");
    }

    const teamExists = await teamRepository.findById(turma.id);

    if (!teamExists) {
      throw new AppError("Não foi possível encontrar a turma");
    }

    const userType = await userTypeRepository.findByDescription("Professor");

    const user = await new CreateUserService().execute({
      email,
      senha,
      tipo_usuario: userType!,
    });

    const teacher = teacherRepository.create({
      nome,
      turma,
      usuario: user,
    });

    await teacherRepository.save(teacher);

    return teacher;
  }
}

export default CreateTeacherService;
