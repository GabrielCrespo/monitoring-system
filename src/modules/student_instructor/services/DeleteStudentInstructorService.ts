import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";

interface IRequest {
  id: number;
}

class DeleteStudentInstructorService {
  public async execute({ id }: IRequest): Promise<void> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );

    const studentInstructor = await studentInstructorRepository.findById(id);

    if (!studentInstructor) {
      throw new AppError("O aluno instrutor não foi encontrado!");
    }

    await studentInstructorRepository.remove(studentInstructor);
  }
}

export default DeleteStudentInstructorService;
