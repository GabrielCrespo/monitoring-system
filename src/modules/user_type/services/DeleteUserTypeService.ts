import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserTypeRepository from "../typeorm/repositories/UserTypeRepository";

interface IRequest {
  id: number;
}

class DeleteUserTypeService {
  public async execute({ id }: IRequest): Promise<void> {
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const userType = await userTypeRepository.findOne(id);

    if (!userType) {
      throw new AppError("O tipo de usuário não foi encontrado!");
    }

    await userTypeRepository.remove(userType);
  }
}

export default DeleteUserTypeService;
