import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Course from "../typeorm/entities/Course";
import CourseRepository from "../typeorm/repositories/CourseRepository";

interface IRequest {
  id: number;
}

class ShowCourseService {
public async execute({ id }: IRequest): Promise<Course> {
    const courseRepository = getCustomRepository(CourseRepository);

    const course = await courseRepository.findOne(id);

    if (!course) {
      throw new AppError("O curso não foi encontrado!");
    }

    return course;
  }

}

export default ShowCourseService;
