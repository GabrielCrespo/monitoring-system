import Team from "@modules/class/typeorm/entities/Team";
import TeamRepository from "@modules/class/typeorm/repositories/TeamRepository";
import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Student from "../typeorm/entities/Student";
import StudentRepository from "../typeorm/repositories/StudentRepository";
import bcrypt from "bcrypt";

interface IRequest {
  matricula: string;
  nome: string;
  data_de_nascimento: string;
  email: string;
  senha: string;
  curso: Course;
  turma: Team;
}

class CreateStudentService {
  public async execute({
    matricula,
    nome,
    data_de_nascimento,
    email,
    senha,
    curso,
    turma,
  }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);
    const courseRepository = getCustomRepository(CourseRepository);
    const teamRepository = getCustomRepository(TeamRepository);

    const registerExists = await studentRepository.findByRegister(matricula);

    if (registerExists) {
      throw new AppError("Já há um aluno cadastrado com essa matrícula!");
    }

    const emailExists = await studentRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Já há um aluno cadastrado com esse e-mail!");
    }

    const courseExists = await courseRepository.findOne(curso.id);

    if (!courseExists) {
      throw new AppError("A curso escolhido não existe!");
    }

    const teamExists = await teamRepository.findById(turma.id);

    if (!teamExists) {
      throw new AppError("A turma escolhida não existe!");
    }

    const hashedPassword = await bcrypt.hash(senha, 8);

    const student = studentRepository.create({
      matricula,
      nome,
      data_de_nascimento,
      email,
      senha: hashedPassword,
      curso,
      turma,
    });

    await studentRepository.save(student);

    return student;
  }
}

export default CreateStudentService;
