import { EntityRepository, Repository } from "typeorm";
import Gender from "../entities/Gender";

@EntityRepository(Gender)
class GenderRepository extends Repository<Gender> {
  public async findById(id: number): Promise<Gender | undefined> {
    const gender = this.findOne({
      where: {
        id,
      },
    });
    return gender;
  }

  public async findByDescription(
    descricao: string
  ): Promise<Gender | undefined> {
    const gender = this.findOne({
      where: {
        descricao,
      },
    });
    return gender;
  }
}

export default GenderRepository;
