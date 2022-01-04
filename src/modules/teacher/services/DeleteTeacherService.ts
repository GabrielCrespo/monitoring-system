import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";

interface Irequest {
  id: number;
}

class DeleteTeacherService {
  public async execute({ id }: Irequest): Promise<void> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacher = await teacherRepository.findById(id);

    if (!teacher) {
      throw new AppError("Professor não encontrado!");
    }

    await teacherRepository.remove(teacher);
  }
}

export default DeleteTeacherService;
