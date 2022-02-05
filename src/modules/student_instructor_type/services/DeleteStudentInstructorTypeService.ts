import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructorTypeRepository from "../typeorm/repositories/StudentInstructorTypeRepository";

interface IRequest {
  id: number;
}

class DeleteStudentInstructorTypeService {
  public async execute({ id }: IRequest): Promise<void> {
    const studentInstructorTypeRepository = getCustomRepository(
      StudentInstructorTypeRepository
    );

    const studentInstructorType =
      await studentInstructorTypeRepository.findById(id);

    if (!studentInstructorType) {
      throw new AppError("O aluno não foi encontrado!");
    }

    await studentInstructorTypeRepository.remove(studentInstructorType);
  }
}

export default DeleteStudentInstructorTypeService;
