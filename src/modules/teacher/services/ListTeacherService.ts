import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";

class ListTeacherService {
  public async execute(): Promise<Teacher[]> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const teachers = await teacherRepository.find();

    return teachers;
  }
}

export default ListTeacherService;
