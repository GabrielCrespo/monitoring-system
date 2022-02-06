import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";

interface IRequest {
  id: number;
}

class ShowStudentInstructorService {
  public async execute({ id }: IRequest): Promise<StudentInstructor> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );

    const studentInstructor = await studentInstructorRepository.findById(id);

    if (!studentInstructor) {
      throw new AppError("O aluno instrutor não foi encontrado!");
    }

    return studentInstructor;
  }
}

export default ShowStudentInstructorService;
