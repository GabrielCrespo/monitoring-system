import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";
import Gender from "@modules/gender/typeorm/entities/Gender";
import UserRepository from "@modules/user/typeorm/repositories/UserRepository";
import UserTypeRepository from "@modules/user_type/typeorm/repositories/UserTypeRepository";
import CreateUserService from "@modules/user/services/CreateUserService";
import GenderRepository from "@modules/gender/typeorm/repository/GenderRepository";

interface IRequest {
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  idade: number;
  tipo_instrutor: string;
  ehCotista: boolean;
  data_de_nascimento: Date;
  curso: Course;
  genero: Gender;
}

class CreateStudentInstructorService {
  public async execute({
    matricula,
    nome,
    email,
    senha,
    telefone,
    idade,
    tipo_instrutor,
    ehCotista,
    data_de_nascimento,
    curso,
    genero,
  }: IRequest): Promise<StudentInstructor> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );
    const courseRepository = getCustomRepository(CourseRepository);
    const userRepository = getCustomRepository(UserRepository);
    const userTypeRepository = getCustomRepository(UserTypeRepository);
    const generoRepository = getCustomRepository(GenderRepository);

    const registerExists = await studentInstructorRepository.findByRegister(
      matricula
    );

    if (registerExists) {
      throw new AppError(
        "Já há um monitor/tutor cadastrado com essa matrícula!"
      );
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Já há um usuário cadastrado com esse e-mail!");
    }

    const courseExists = await courseRepository.findOne(curso.id);

    if (!courseExists) {
      throw new AppError("Não foi possível encontrar o curso!");
    }

    const generoExists = await generoRepository.findById(genero.id);

    if (!generoExists) {
      throw new AppError("Não foi possível encontrar o gênero!");
    }

    const userType = await userTypeRepository.findByDescription(tipo_instrutor);

    const usuario = await new CreateUserService().execute({
      email,
      senha,
      tipo_usuario: userType!,
    });

    const studentInstructor = studentInstructorRepository.create({
      matricula,
      nome,
      telefone,
      tipo_instrutor,
      ehCotista,
      idade,
      data_de_nascimento,
      curso,
      genero,
      usuario,
    });

    await studentInstructorRepository.save(studentInstructor);

    return studentInstructor;
  }
}

export default CreateStudentInstructorService;
