import { getCustomRepository } from "typeorm";
import UserType from "../typeorm/entities/UserType";
import UserTypeRepository from "../typeorm/repositories/UserTypeRepository";

class ListUserTypeService {
  public async execute(): Promise<UserType[]> {
    const userTypeRepository = getCustomRepository(UserTypeRepository);

    const userType = await userTypeRepository.find();

    return userType;
  }
}

export default ListUserTypeService;
