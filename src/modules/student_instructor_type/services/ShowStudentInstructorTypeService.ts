import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructorType from "../typeorm/entities/StudentInstructorType";
import StudentInstructorTypeRepository from "../typeorm/repositories/StudentInstructorTypeRepository";

interface IRequest {
  id: number;
}

class ShowStudentInstructorTypeService {
  public async execute({ id }: IRequest): Promise<StudentInstructorType> {
    const studentInstructorTypeRepository = getCustomRepository(
      StudentInstructorTypeRepository
    );

    const studentInstructorType =
      await studentInstructorTypeRepository.findById(id);

    if (!studentInstructorType) {
      throw new AppError("O tipo de estudante instrutor não foi encontrado!");
    }

    return studentInstructorType;
  }
}

export default ShowStudentInstructorTypeService;
