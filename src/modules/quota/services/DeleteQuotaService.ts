import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import QuotaRepository from "../typeorm/repositories/QuotaRepository";

interface IRequest {
  id: number;
}

class DeleteQuotaService {
  public async execute({ id }: IRequest): Promise<void> {
    const quotaRepository = getCustomRepository(QuotaRepository);

    const quota = await quotaRepository.findOne(id);

    if (!quota) {
      throw new AppError("O tipo de cota não foi encontrado!");
    }

    await quotaRepository.remove(quota);
  }
}

export default DeleteQuotaService;
