import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Quota from "../typeorm/entities/Quota";
import QuotaRepository from "../typeorm/repositories/QuotaRepository";

interface IRequest {
  id: number;
  descricao: string;
}

class UpdateQuotaService {
  public async execute({ id, descricao }: IRequest): Promise<Quota> {
    const quotaRepository = getCustomRepository(QuotaRepository);

    const quota = await quotaRepository.findOne(id);

    if (!quota) {
      throw new AppError("O curso não foi encontrado!");
    }

    const descricaoExists = await quotaRepository.findByDescription(descricao);

    if (descricaoExists && quota.descricao !== descricao) {
      throw new AppError("Já existe um curso cadastrado com essa descrição!");
    }

    quota.descricao = descricao;

    await quotaRepository.save(quota);

    return quota;
  }
}

export default UpdateQuotaService;
