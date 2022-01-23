import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Student from "../typeorm/entities/Student";
import StudentRepository from "../typeorm/repositories/StudentRepository";

interface IRequest {
  id: number;
}

class ShowStudentService {
  public async execute({ id }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);

    const student = await studentRepository.findById(id);

    if (!student) {
      throw new AppError("O aluno não foi encontrado!");
    }

    return student;
  }
}

export default ShowStudentService;
