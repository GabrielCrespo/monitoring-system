import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CourseRepository from "../typeorm/repositories/CourseRepository";

interface IRequest {
  id: number;
}

class DeleteCourseService {
  public async execute({ id }: IRequest): Promise<void> {
    const courseRepository = getCustomRepository(CourseRepository);

    const course = await courseRepository.findOne(id);

    if (!course) {
      throw new AppError("O curso não foi encontrado!");
    }

    await courseRepository.delete(course);
  }
}

export default DeleteCourseService;
