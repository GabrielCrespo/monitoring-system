import Team from "@modules/class/typeorm/entities/Team";
import { EntityRepository, Repository } from "typeorm";
import Teacher from "../entities/Teacher";

@EntityRepository(Teacher)
class TeacherRepository extends Repository<Teacher> {
  public async findById(id: number): Promise<Teacher | undefined> {
    const teacher = await this.findOne({
      where: {
        id,
      },
    });
    return teacher;
  }
  public async findByName(nome: string): Promise<Teacher | undefined> {
    const teacher = await this.findOne({
      where: {
        nome,
      },
    });
    return teacher;
  }

  public async findByEmail(email: string): Promise<Teacher | undefined> {
    const teacher = await this.findOne({
      where: {
        email,
      },
    });
    return teacher;
  }

  public async findByClass(turma: Team): Promise<Teacher | undefined> {
    const teacher = await this.findOne({
      where: {
        turma,
      },
    });
    return teacher;
  }
}

export default TeacherRepository;
