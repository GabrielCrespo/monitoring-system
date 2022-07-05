import { EntityRepository, Repository } from "typeorm";
import Quota from "../entities/Quota";

@EntityRepository(Quota)
class QuotaRepository extends Repository<Quota> {
  public async findByDescription(
    descricao: string
  ): Promise<Quota | undefined> {
    const quota = await this.findOne({
      where: {
        descricao,
      },
    });

    return quota;
  }
}

export default QuotaRepository;
