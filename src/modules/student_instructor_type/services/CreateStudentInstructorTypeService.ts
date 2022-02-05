import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructorType from "../typeorm/entities/StudentInstructorType";
import StudentInstructorTypeRepository from "../typeorm/repositories/StudentInstructorTypeRepository";

interface IRequest {
  descricao: string;
}

class CreateStudentInstructorTypeService {
  public async execute({
    descricao,
  }: IRequest): Promise<StudentInstructorType> {
    const studentInstructorTypeRepository = getCustomRepository(
      StudentInstructorTypeRepository
    );

    const studentInstructorTypeExists =
      await studentInstructorTypeRepository.findByDescription(descricao);

    if (studentInstructorTypeExists) {
      throw new AppError("Esse tipo de aluno instrutor já está cadastrado");
    }

    const studentInstructorType = studentInstructorTypeRepository.create({
      descricao,
    });

    await studentInstructorTypeRepository.save(studentInstructorType);

    return studentInstructorType;
  }
}

export default CreateStudentInstructorTypeService;
