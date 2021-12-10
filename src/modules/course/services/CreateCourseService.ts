import AppError from "@shared/errors/AppError";
import { getConnection, getCustomRepository } from "typeorm";
import Course from "../typeorm/entities/Course";
import CourseRepository from "../typeorm/repositories/CourseRepository";

interface IRequest {
  descricao: string;
}

class CreateCourseService {
  public async execute({ descricao }: IRequest): Promise<Course> {
    const courseRepository = getCustomRepository(CourseRepository);

    const courseExists = await courseRepository.findByName(descricao);

    if (courseExists) {
      throw new AppError("Esse curso já está cadastrado");
    }

    const course = courseRepository.create({
      descricao,
    });

    await courseRepository.save(course);

    return course;
  }
}

export default CreateCourseService;
