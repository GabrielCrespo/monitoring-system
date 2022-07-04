import { getCustomRepository } from "typeorm";
import Gender from "../typeorm/entities/Gender";
import GenderRepository from "../typeorm/repository/GenderRepository";

class ListGenderService {
  public async execute(): Promise<Gender[]> {
    const genderRepository = getCustomRepository(GenderRepository);

    const genders = await genderRepository.find();

    return genders;
  }
}

export default ListGenderService;
