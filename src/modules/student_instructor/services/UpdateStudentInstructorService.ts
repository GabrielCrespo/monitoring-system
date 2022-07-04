import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import Gender from "@modules/gender/typeorm/entities/Gender";
import UserRepository from "@modules/user/typeorm/repositories/UserRepository";
import GenderRepository from "@modules/gender/typeorm/repository/GenderRepository";
import UpdateUserService from "@modules/user/services/UpdateUserService";
import UserTypeRepository from "@modules/user_type/typeorm/repositories/UserTypeRepository";

interface IRequest {
  id: number;
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  idade: number;
  telefone: string;
  tipo_instrutor: string;
  ehCotista: boolean;
  data_de_nascimento: Date;
  curso: Course;
  genero: Gender;
}

class UpdateStudentInstructorService {
  public async execute({
    id,
    matricula,
    nome,
    email,
    senha,
    idade,
    telefone,
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

    const studentInstructor = await studentInstructorRepository.findById(id);

    if (!studentInstructor) {
      throw new AppError("O monitor/tutor não foi encontrado!");
    }

    const registerExists = await studentInstructorRepository.findByRegister(
      matricula
    );

    if (registerExists && studentInstructor.matricula != matricula) {
      throw new AppError(
        "Já há um monitor/tutor cadastrado com essa matrícula!"
      );
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists && studentInstructor.usuario.email != email) {
      throw new AppError("Já há um monitor/tutor cadastrado com esse e-mail!");
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

    const user = await new UpdateUserService().execute({
      id: studentInstructor.usuario.id,
      email,
      senha,
      eh_admin: studentInstructor.usuario.eh_admin,
      tipo_usuario: userType!,
    });

    studentInstructor.matricula = matricula;
    studentInstructor.nome = nome;
    studentInstructor.telefone = telefone;
    studentInstructor.ehCotista = ehCotista;
    studentInstructor.idade = idade;
    studentInstructor.genero = genero;
    studentInstructor.data_de_nascimento = data_de_nascimento;
    studentInstructor.curso = curso;
    studentInstructor.usuario = user;

    await studentInstructorRepository.save(studentInstructor);

    return studentInstructor;
  }
}

export default UpdateStudentInstructorService;
