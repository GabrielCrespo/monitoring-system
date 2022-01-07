import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";
import bcrypt, { compare } from "bcrypt";

interface IRequest {
  email: string;
  senha: string;
}

// interface IResponse {
//   professor: Teacher;
// }

class CreateTeacherSessionService {
  public async execute({ email, senha }: IRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacher = await teacherRepository.findByEmail(email);

    if (!teacher) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    const confirmedPassword = await compare(senha, teacher.senha);

    if (!confirmedPassword) {
      throw new AppError(
        "A combinação entre e-mail e senha está incorreta!",
        401
      );
    }

    return teacher;
  }
}

export default CreateTeacherSessionService;
