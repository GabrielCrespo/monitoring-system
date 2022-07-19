import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";
import MonitoringTime from "@modules/monitoring_time/typeorm/entities/MonitoringTime";

interface IRequest {
  id: number;
  horarios_monitoria: MonitoringTime[];
}

class CreateStudenteInstructorMonitoringTimeService {
  public async execute({
    id,
    horarios_monitoria,
  }: IRequest): Promise<StudentInstructor> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );

    const studentInstructor = await studentInstructorRepository.findById(id);

    if (!studentInstructor) {
      throw new AppError("Não foi possível encontrar o monitor!");
    }

    studentInstructor.horarios_monitoria = horarios_monitoria;

    await studentInstructorRepository.save(studentInstructor);

    return studentInstructor;
  }
}

export default CreateStudenteInstructorMonitoringTimeService;
