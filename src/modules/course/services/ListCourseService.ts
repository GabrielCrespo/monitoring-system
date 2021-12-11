import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Course from "../typeorm/entities/Course";
import CourseRepository from "../typeorm/repositories/CourseRepository";

class ListCourseService {
  public async execute(): Promise<Course[]> {
    const courseRepository = getCustomRepository(CourseRepository);

    const courses = await courseRepository.find();

    return courses;
  }
}

export default ListCourseService;
