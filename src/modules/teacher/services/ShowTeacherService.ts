import AppError from "@shared/errors/AppError";
import { getCustomRepository, LessThanOrEqual } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";

interface Irequest {
  id: number;
}

class ShowTeacherService {
  public async execute({ id }: Irequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacher = await teacherRepository.findById(id);

    if (!teacher) {
      throw new AppError("Professor não encontrado!");
    }

    return teacher;
  }
}

export default ShowTeacherService;
