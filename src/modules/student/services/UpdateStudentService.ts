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
  id: number;
  matricula: string;
  nome: string;
  data_de_nascimento: Date;
  email: string;
  senha: string;
  curso: Course;
  turma: Team;
}

class UpdateStudentService {
  public async execute({
    id,
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

    const student = await studentRepository.findById(id);

    if (!student) {
      throw new AppError("O aluno não foi encontrado!");
    }

    const registerExists = await studentRepository.findByRegister(matricula);

    if (registerExists && student.matricula !== matricula) {
      throw new AppError("Já há um aluno cadastrado com essa matrícula!");
    }

    const emailExists = await studentRepository.findByEmail(email);

    if (emailExists && student.email !== email) {
      throw new AppError("Já há um aluno cadastrado com esse email!");
    }

    const courseExists = await courseRepository.findOne(curso.id);

    if (!courseExists) {
      throw new AppError("A curso escolhido não existe!");
    }

    const teamExists = await teamRepository.findById(turma.id);

    if (!teamExists) {
      throw new AppError("A turma escolhida não existe!");
    }

    const hashedSenha = await bcrypt.hash(senha, 8);

    student.matricula = matricula;
    student.nome = nome;
    student.data_de_nascimento = data_de_nascimento;
    student.email = email;
    student.senha = hashedSenha;
    student.curso = curso;
    student.turma = turma;

    await studentRepository.save(student);

    return student;
  }
}

export default UpdateStudentService;
