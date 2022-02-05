import { getCustomRepository } from "typeorm";
import StudentInstructorType from "../typeorm/entities/StudentInstructorType";
import StudentInstructorTypeRepository from "../typeorm/repositories/StudentInstructorTypeRepository";

class ListStudentInstructorTypeService {
  public async execute(): Promise<StudentInstructorType[]> {
    const studentInstructorTypeRepository = getCustomRepository(
      StudentInstructorTypeRepository
    );

    const studentInstructorTypes = await studentInstructorTypeRepository.find();

    return studentInstructorTypes;
  }
}

export default ListStudentInstructorTypeService;
