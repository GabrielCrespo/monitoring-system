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
import Gender from "@modules/gender/typeorm/entities/Gender";
import GenderRepository from "@modules/gender/typeorm/repository/GenderRepository";

interface IRequest {
  matricula: string;
  nome: string;
  data_de_nascimento: string;
  email: string;
  senha: string;
  telefone: string;
  ehCotista: boolean;
  idade: number;
  curso: Course;
  turma: Team;
  genero: Gender;
}

class CreateStudentService {
  public async execute({
    matricula,
    nome,
    data_de_nascimento,
    email,
    telefone,
    ehCotista,
    idade,
    senha,
    curso,
    turma,
    genero,
  }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);
    const courseRepository = getCustomRepository(CourseRepository);
    const teamRepository = getCustomRepository(TeamRepository);
    const userRepository = getCustomRepository(UserRepository);
    const userTypeRepository = getCustomRepository(UserTypeRepository);
    const genderRepository = getCustomRepository(GenderRepository);

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

    const genderExist = await genderRepository.findById(genero.id);

    if (!genderExist) {
      throw new AppError("A gênero escolhido não existe!");
    }

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
      idade,
      ehCotista,
      telefone,
      curso,
      turma,
      genero,
      usuario: user,
    });

    await studentRepository.save(student);

    return student;
  }
}

export default CreateStudentService;
