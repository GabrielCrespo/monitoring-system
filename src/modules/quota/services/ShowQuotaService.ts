import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Quota from "../typeorm/entities/Quota";
import QuotaRepository from "../typeorm/repositories/QuotaRepository";

interface IRequest {
  id: number;
}

class ShowQuotaService {
  public async execute({ id }: IRequest): Promise<Quota> {
    const quotaRepository = getCustomRepository(QuotaRepository);

    const quota = await quotaRepository.findOne(id);

    if (!quota) {
      throw new AppError("O tipo de cota não foi encontrado!");
    }

    return quota;
  }
}

export default ShowQuotaService;
