import { EntityRepository, Repository } from "typeorm";
import StudentInstructor from "../entities/StudentInstructor";

@EntityRepository(StudentInstructor)
class StudentInstructorRepository extends Repository<StudentInstructor> {
  public async findById(id: number): Promise<StudentInstructor | undefined> {
    const studentInstructor = await this.findOne({
      where: {
        id,
      },
    });

    return studentInstructor;
  }

  public async findByRegister(
    matricula: string
  ): Promise<StudentInstructor | undefined> {
    const studentInstructor = await this.findOne({
      where: {
        matricula,
      },
    });

    return studentInstructor;
  }

  public async findByName(
    nome: string
  ): Promise<StudentInstructor | undefined> {
    const studentInstructor = await this.findOne({
      where: {
        nome,
      },
    });

    return studentInstructor;
  }

  public async findByEmail(
    email: string
  ): Promise<StudentInstructor | undefined> {
    const studentInstructor = await this.findOne({
      where: {
        email,
      },
    });

    return studentInstructor;
  }
}

export default StudentInstructorRepository;
