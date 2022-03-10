import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserType from "../typeorm/entities/UserType";
import UserTypeRepository from "../typeorm/repositories/UserTypeRepository";

interface IRequest {
  descricao: string;
}

class CreateUserTypeService {
  public async execute({ descricao }: IRequest): Promise<UserType> {
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const userTypeExists = await userTypeRepository.findByDescription(
      descricao
    );

    if (userTypeExists) {
      throw new AppError("Esse tipo de usuário já está cadastrado!");
    }

    const userType = userTypeRepository.create({
      descricao,
    });

    await userTypeRepository.save(userType);

    return userType;
  }
}

export default CreateUserTypeService;
