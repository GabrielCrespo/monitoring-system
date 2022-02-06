import Role from "@modules/roles/typeorm/entities/Role";
import RolesRepository from "@modules/roles/typeorm/repositories/RolesRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";

interface IRequest {
  id: number;
  funcao: Role;
}

class UpdateStudentInstructorRoleService {
  public async execute({ id, funcao }: IRequest): Promise<StudentInstructor> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );
    const roleRepository = getCustomRepository(RolesRepository);

    const studentInstructor = await studentInstructorRepository.findById(id);

    if (!studentInstructor) {
      throw new AppError("O aluno instrutor não foi encontrado!");
    }

    const roleExists = await roleRepository.findById(funcao.id);

    if (!roleExists) {
      throw new AppError("Não foi possível encontrar a função!");
    }

    studentInstructor.funcao = funcao;

    studentInstructorRepository.save(studentInstructor);

    return studentInstructor;
  }
}

export default UpdateStudentInstructorRoleService;
