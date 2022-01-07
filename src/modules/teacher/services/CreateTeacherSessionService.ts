import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  professor: Teacher;
  token: string;
}

class CreateTeacherSessionService {
  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacher = await teacherRepository.findByEmail(email);

    if (!teacher) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const confirmedPassword = await bcrypt.compare(senha, teacher.senha);

    if (!confirmedPassword) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const token = sign({}, auth.jwt.secret, {
      subject: teacher.id.toString(),
      expiresIn: auth.jwt.expiresIn,
    })

    return {
      professor: teacher,
      token
    };
  }
}

export default CreateTeacherSessionService;
