import { getCustomRepository } from "typeorm";
import Quota from "../typeorm/entities/Quota";
import QuotaRepository from "../typeorm/repositories/QuotaRepository";

class ListQuotaService {
  public async execute(): Promise<Quota[]> {
    const quotaRepository = getCustomRepository(QuotaRepository);

    const quotas = await quotaRepository.find();

    return quotas;
  }
}

export default ListQuotaService;
