import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Course from "../typeorm/entities/Course";
import CourseRepository from "../typeorm/repositories/CourseRepository";

interface IRequest {
  id: number;
  descricao: string;
}

class UpdateCourseService {
  public async execute({ id, descricao }: IRequest): Promise<Course> {
    const courseRepository = getCustomRepository(CourseRepository);

    const course = await courseRepository.findOne(id);

    if (!course) {
      throw new AppError("O curso não foi encontrado!");
    }

    const descricaoExists = await courseRepository.findByName(descricao);

    if (descricaoExists && course.descricao !== descricao) {
      throw new AppError("Já existe um curso cadastrado com esse nome!");
    }

    course.descricao = descricao;

    await courseRepository.save(course);

    return course;
  }
}

export default UpdateCourseService;
