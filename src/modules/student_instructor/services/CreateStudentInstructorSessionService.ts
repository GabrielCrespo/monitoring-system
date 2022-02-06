import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";
import StudentInstructor from "../typeorm/entities/StudentInstructor";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  aluno: StudentInstructor;
  token: string;
}

class CreateStudentInstructorSessionService {
  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );

    const studentInstructor = await studentInstructorRepository.findByEmail(
      email
    );

    if (!studentInstructor) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const confirmedPassword = await bcrypt.compare(
      senha,
      studentInstructor.senha
    );

    if (!confirmedPassword) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const token = sign({}, auth.jwt.secret, {
      subject: studentInstructor.id.toString(),
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      aluno: studentInstructor,
      token,
    };
  }
}

export default CreateStudentInstructorSessionService;
