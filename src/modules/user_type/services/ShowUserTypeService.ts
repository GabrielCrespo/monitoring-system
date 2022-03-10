import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserType from "../typeorm/entities/UserType";
import UserTypeRepository from "../typeorm/repositories/UserTypeRepository";

interface IRequest {
  id: number;
}

class ShowUserTypeService {
  public async execute({ id }: IRequest): Promise<UserType> {
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const userType = await userTypeRepository.findOne(id);

    if (!userType) {
      throw new AppError("O tipo de usuário não foi encontrado!");
    }

    return userType;
  }
}

export default ShowUserTypeService;
