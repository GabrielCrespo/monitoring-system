import { getCustomRepository } from "typeorm";
import Student from "../typeorm/entities/Student";
import StudentRepository from "../typeorm/repositories/StudentRepository";

class ListStudentService {
  public async execute(): Promise<Student[]> {
    const studentRepository = getCustomRepository(StudentRepository);

    const students = await studentRepository.find();

    return students;
  }
}

export default ListStudentService;
