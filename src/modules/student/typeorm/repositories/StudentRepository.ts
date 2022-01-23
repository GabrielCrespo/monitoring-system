import { EntityRepository, Repository } from "typeorm";
import Student from "../entities/Student";

@EntityRepository(Student)
class StudentRepository extends Repository<Student> {
  public async findById(id: number): Promise<Student | undefined> {
    const student = await this.findOne({
      where: {
        id,
      },
    });

    return student;
  }

  public async findByRegister(matricula: string): Promise<Student | undefined> {
    const student = await this.findOne({
      where: {
        matricula,
      },
    });

    return student;
  }

  public async findByName(nome: string): Promise<Student | undefined> {
    const student = await this.findOne({
      where: {
        nome,
      },
    });

    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const student = await this.findOne({
      where: {
        email,
      },
    });

    return student;
  }
}

export default StudentRepository;
