import { getCustomRepository } from "typeorm";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";

class ListStudentInstructorService {
  public async execute(): Promise<StudentInstructor[]> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );

    const studentsInstructors = await studentInstructorRepository.find();

    return studentsInstructors;
  }
}

export default ListStudentInstructorService;
