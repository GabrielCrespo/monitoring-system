import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructorType from "../typeorm/entities/StudentInstructorType";
import StudentInstructorTypeRepository from "../typeorm/repositories/StudentInstructorTypeRepository";

interface IRequest {
  id: number;
  descricao: string;
}

class UpdateStudentInstructorTypeService {
  public async execute({
    id,
    descricao,
  }: IRequest): Promise<StudentInstructorType> {
    const studentInstructorTypeRepository = getCustomRepository(
      StudentInstructorTypeRepository
    );

    const studentInstructorType =
      await studentInstructorTypeRepository.findById(id);

    if (!studentInstructorType) {
      throw new AppError("O tipo de estudante instrutor não foi encontrado!");
    }

    const studentInstructorTypeExists =
      await studentInstructorTypeRepository.findByDescription(descricao);

    if (
      studentInstructorTypeExists &&
      studentInstructorType.descricao != descricao
    ) {
      throw new AppError("Já há o tipo de estudante instrutor cadastrado!");
    }

    studentInstructorType.descricao = descricao;

    await studentInstructorTypeRepository.save(studentInstructorType);

    return studentInstructorType;
  }
}

export default UpdateStudentInstructorTypeService;
