import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import StudentRepository from "../typeorm/repositories/StudentRepository";
import Student from "../typeorm/entities/Student";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  aluno: Student;
  token: string;
}

class CreateStudentSessionService {
  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const studentRepository = getCustomRepository(StudentRepository);

    const student = await studentRepository.findByEmail(email);

    if (!student) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const confirmedPassword = await bcrypt.compare(senha, student.senha);

    if (!confirmedPassword) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const token = sign({}, auth.jwt.secret, {
      subject: student.id.toString(),
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      aluno: student,
      token,
    };
  }
}

export default CreateStudentSessionService;
