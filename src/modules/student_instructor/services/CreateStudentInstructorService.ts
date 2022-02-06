import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import Role from "@modules/roles/typeorm/entities/Role";
import RolesRepository from "@modules/roles/typeorm/repositories/RolesRepository";
import StudentInstructorType from "@modules/student_instructor_type/typeorm/entities/StudentInstructorType";
import StudentInstructorTypeRepository from "@modules/student_instructor_type/typeorm/repositories/StudentInstructorTypeRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";
import bcrypt from "bcrypt";

interface IRequest {
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  data_de_nascimento: Date;
  tipo_aluno_instrutor: StudentInstructorType;
  curso: Course;
}

class CreateStudentInstructorService {
  public async execute({
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
    const roleRepository = getCustomRepository(RolesRepository);

    const registerExists = await studentInstructorRepository.findByRegister(
      matricula
    );

    if (registerExists) {
      throw new AppError(
        "Já há um aluno instrutor cadastrado com essa matrícula!"
      );
    }

    const emailExists = await studentInstructorRepository.findByEmail(email);

    if (emailExists) {
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

    // const roleExists = await roleRepository.findById(funcao.id);

    // if (!roleExists) {
    //   throw new AppError("Não foi possível encontrar a função!");
    // }

    const senhaHashed = await bcrypt.hash(senha, 8);
    const standardRole = await roleRepository.findByDescription("Normal");

    const studentInstructor = studentInstructorRepository.create({
      matricula,
      nome,
      email,
      senha: senhaHashed,
      data_de_nascimento,
      tipo_aluno_instrutor,
      curso,
      funcao: standardRole,
    });

    await studentInstructorRepository.save(studentInstructor);

    return studentInstructor;
  }
}

export default CreateStudentInstructorService;
