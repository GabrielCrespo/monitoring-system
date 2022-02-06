import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import StudentInstructorType from "@modules/student_instructor_type/typeorm/entities/StudentInstructorType";
import StudentInstructorTypeRepository from "@modules/student_instructor_type/typeorm/repositories/StudentInstructorTypeRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";
import bcrypt from "bcrypt";
import StudentInstructor from "../typeorm/entities/StudentInstructor";

interface IRequest {
  id: number;
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  data_de_nascimento: Date;
  tipo_aluno_instrutor: StudentInstructorType;
  curso: Course;
}

class UpdateStudentInstructorService {
  public async execute({
    id,
    matricula,
    nome,
    email,
    senha,
    data_de_nascimento,
    tipo_aluno_instrutor,
    curso,
  }: IRequest): Promise<StudentInstructor> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );
    const studentInstructorTypeRepository = getCustomRepository(
      StudentInstructorTypeRepository
    );
    const courseRepository = getCustomRepository(CourseRepository);

    const studentInstructor = await studentInstructorRepository.findById(id);

    if (!studentInstructor) {
      throw new AppError("O aluno instrutor não foi encontrado!");
    }

    const registerExists = await studentInstructorRepository.findByRegister(
      matricula
    );

    if (registerExists && studentInstructor.matricula != matricula) {
      throw new AppError(
        "Já há um aluno instrutor cadastrado com essa matrícula!"
      );
    }

    const emailExists = await studentInstructorRepository.findByEmail(email);

    if (emailExists && studentInstructor.email != email) {
      throw new AppError(
        "Já há um aluno instrutor cadastrado com esse e-mail!"
      );
    }
    const studentInstructorTypeExists =
      await studentInstructorTypeRepository.findById(tipo_aluno_instrutor.id);

    if (!studentInstructorTypeExists) {
      throw new AppError(
        "Não foi possível encontrar o tipo de aluno instrutor!"
      );
    }

    const courseExists = await courseRepository.findOne(curso.id);

    if (!courseExists) {
      throw new AppError("Não foi possível encontrar o curso!");
    }

    const senhaHashed = await bcrypt.hash(senha, 8);

    studentInstructor.matricula = matricula;
    studentInstructor.nome = nome;
    studentInstructor.email = email;
    studentInstructor.senha = senhaHashed;
    studentInstructor.data_de_nascimento = data_de_nascimento;
    studentInstructor.tipo_aluno_instrutor = tipo_aluno_instrutor;
    studentInstructor.curso = curso;

    await studentInstructorRepository.save(studentInstructor);

    return studentInstructor;
  }
}

export default UpdateStudentInstructorService;
