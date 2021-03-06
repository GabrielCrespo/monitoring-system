import Team from "@modules/class/typeorm/entities/Team";
import TeamRepository from "@modules/class/typeorm/repositories/TeamRepository";
import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Student from "../typeorm/entities/Student";
import StudentRepository from "../typeorm/repositories/StudentRepository";
import CreateUserService from "@modules/user/services/CreateUserService";
import UserTypeRepository from "@modules/user_type/typeorm/repositories/UserTypeRepository";
import UserRepository from "@modules/user/typeorm/repositories/UserRepository";
import Preference from "@modules/preference/typeorm/entities/Preference";
import CreatePreferenceService from "@modules/preference/services/CreatePreferenceService";

interface IRequest {
  matricula: string;
  nome: string;
  data_de_nascimento: string;
  email: string;
  senha: string;
  telefone: string;
  curso: Course;
  turma: Team;
  preferencia: Preference;
}

class CreateStudentService {
  public async execute({
    matricula,
    nome,
    data_de_nascimento,
    email,
    telefone,
    senha,
    curso,
    turma,
    preferencia,
  }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);
    const courseRepository = getCustomRepository(CourseRepository);
    const teamRepository = getCustomRepository(TeamRepository);
    const userRepository = getCustomRepository(UserRepository);
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const registerExists = await studentRepository.findByRegister(matricula);

    if (registerExists) {
      throw new AppError("Matrícula já cadastrada!");
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("E-mail já cadastrado!");
    }

    const courseExists = await courseRepository.findOne(curso.id);

    if (!courseExists) {
      throw new AppError("A curso escolhido não existe!");
    }

    const teamExists = await teamRepository.findById(turma.id);

    if (!teamExists) {
      throw new AppError("A turma escolhida não existe!");
    }

    const preference = await new CreatePreferenceService().execute({
      curso: preferencia.curso,
      genero: preferencia.genero,
      cota: preferencia.cota,
    });

    const userType = await userTypeRepository.findByDescription("Aluno");

    const user = await new CreateUserService().execute({
      email,
      senha,
      tipo_usuario: userType!,
    });

    const student = studentRepository.create({
      matricula,
      nome,
      data_de_nascimento,
      telefone,
      curso,
      turma,
      usuario: user,
      preferencia: preference,
    });

    await studentRepository.save(student);

    return student;
  }
}

export default CreateStudentService;
