import { EntityRepository, Repository } from "typeorm";
import Course from "../entities/Course";

@EntityRepository(Course)
class CourseRepository extends Repository<Course> {
  public async findByName(descricao: string): Promise<Course | undefined> {
    const course = await this.findOne({
      where: {
        descricao,
      },
    });

    return course;
  }
}

export default CourseRepository;
