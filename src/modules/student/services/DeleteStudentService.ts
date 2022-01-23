import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Student from "../typeorm/entities/Student";
import StudentRepository from "../typeorm/repositories/StudentRepository";

interface IRequest {
  id: number;
}

class DeleteStudentService {
  public async execute({ id }: IRequest): Promise<void> {
    const studentRepository = getCustomRepository(StudentRepository);

    const student = await studentRepository.findById(id);

    if (!student) {
      throw new AppError("O aluno não foi encontrado!");
    }

    await studentRepository.remove(student);
  }
}

export default DeleteStudentService;
