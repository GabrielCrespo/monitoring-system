import Team from "@modules/class/typeorm/entities/Team";
import TeamRepository from "@modules/class/typeorm/repositories/TeamRepository";
import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Student from "../typeorm/entities/Student";
import StudentRepository from "../typeorm/repositories/StudentRepository";
import bcrypt from "bcrypt";
import UserRepository from "@modules/user/typeorm/repositories/UserRepository";
import Preference from "@modules/preference/typeorm/entities/Preference";
import UpdatePreferenceService from "@modules/preference/services/UpdatePreferenceService";

interface IRequest {
  id: number;
  matricula: string;
  nome: string;
  data_de_nascimento: Date;
  email: string;
  senha: string;
  telefone: string;
  curso: Course;
  turma: Team;
  preferencia: Preference;
}

class UpdateStudentService {
  public async execute({
    id,
    matricula,
    nome,
    data_de_nascimento,
    email,
    senha,
    telefone,
    curso,
    turma,
    preferencia,
  }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);
    const courseRepository = getCustomRepository(CourseRepository);
    const teamRepository = getCustomRepository(TeamRepository);
    const userRepository = getCustomRepository(UserRepository);

    const student = await studentRepository.findById(id);

    if (!student) {
      throw new AppError("O aluno não foi encontrado!");
    }

    const registerExists = await studentRepository.findByRegister(matricula);

    if (registerExists && student.matricula !== matricula) {
      throw new AppError("Matrícula já cadastrada!");
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists && student.usuario.email !== email) {
      throw new AppError("Email já cadastrado!");
    }

    const courseExists = await courseRepository.findOne(curso.id);

    if (!courseExists) {
      throw new AppError("A curso escolhido não existe!");
    }

    const teamExists = await teamRepository.findById(turma.id);

    if (!teamExists) {
      throw new AppError("A turma escolhida não existe!");
    }

    const updatePreferencia = await new UpdatePreferenceService().execute({
      id: student.preferencia.id,
      curso: preferencia.curso,
      genero: preferencia.genero,
      cota: preferencia.cota,
    });

    const hashedSenha = await bcrypt.hash(senha, 8);

    student.matricula = matricula;
    student.nome = nome;
    student.data_de_nascimento = data_de_nascimento;
    student.usuario.email = email;
    student.usuario.senha = hashedSenha;
    student.telefone = telefone;
    student.curso = curso;
    student.turma = turma;
    student.preferencia = updatePreferencia;

    await studentRepository.save(student);

    return student;
  }
}

export default UpdateStudentService;
