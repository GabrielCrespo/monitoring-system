import { EntityRepository, Repository } from "typeorm";
import StudentInstructorType from "../entities/StudentInstructorType";

@EntityRepository(StudentInstructorType)
class StudentInstructorTypeRepository extends Repository<StudentInstructorType> {
  public async findById(
    id: number
  ): Promise<StudentInstructorType | undefined> {
    const studentInstructorType = await this.findOne({
      where: {
        id,
      },
    });

    return studentInstructorType;
  }

  public async findByDescription(
    descricao: string
  ): Promise<StudentInstructorType | undefined> {
    const studentInstructorType = await this.findOne({
      where: {
        descricao,
      },
    });

    return studentInstructorType;
  }
}

export default StudentInstructorTypeRepository;
