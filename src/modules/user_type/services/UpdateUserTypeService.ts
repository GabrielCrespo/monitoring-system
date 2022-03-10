import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserType from "../typeorm/entities/UserType";
import UserTypeRepository from "../typeorm/repositories/UserTypeRepository";

interface IRequest {
  id: number;
  descricao: string;
}

class UpdateUserTypeService {
  public async execute({ id, descricao }: IRequest): Promise<UserType> {
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const userType = await userTypeRepository.findOne(id);

    if (!userType) {
      throw new AppError("O tipo de usuário não foi encontrado!");
    }

    const userTypeExists = await userTypeRepository.findByDescription(
      descricao
    );

    if (userTypeExists && userType.descricao !== descricao) {
      throw new AppError("Já existe uma função cadastrada com essa descrição!");
    }

    userType.descricao = descricao;

    await userTypeRepository.save(userType);

    return userType;
  }
}

export default UpdateUserTypeService;
