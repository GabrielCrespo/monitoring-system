import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Course from "../typeorm/entities/Course";
import CourseRepository from "../typeorm/repositories/CourseRepository";

interface IRequest {
  id: number;
  description: string;
}

class UpdateCourseService {
  public async execute({ id, description }: IRequest): Promise<Course> {
    const courseRepository = getCustomRepository(CourseRepository);

    const course = await courseRepository.findOne(id);

    if (!course) {
      throw new AppError("O curso não foi encontrado!");
    }

    const descriptionExists = await courseRepository.findByName(description);

    if (descriptionExists && course.descricao !== description) {
      throw new AppError("Já existe um curso cadastrado com esse nome!");
    }

    course.descricao = description;

    await courseRepository.save(course);

    return course;
  }
}

export default UpdateCourseService;
