import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Quota from "../typeorm/entities/Quota";
import QuotaRepository from "../typeorm/repositories/QuotaRepository";

interface IRequest {
  descricao: string;
}

class CreateQuotaService {
  public async execute({ descricao }: IRequest): Promise<Quota> {
    const quotaRepository = getCustomRepository(QuotaRepository);

    const quotaExists = await quotaRepository.findByDescription(descricao);

    if (quotaExists) {
      throw new AppError("Esse tipo de cota já está cadastrado");
    }

    const quota = quotaRepository.create({
      descricao,
    });

    await quotaRepository.save(quota);

    return quota;
  }
}

export default CreateQuotaService;
