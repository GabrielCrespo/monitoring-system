import { EntityRepository, Repository } from "typeorm";
import UserType from "../entities/UserType";

@EntityRepository(UserType)
class UserTypeRepository extends Repository<UserType> {
  public async findById(id: number): Promise<UserType | undefined> {
    const userType = await this.findOne({
      where: {
        id,
      },
    });
    return userType;
  }

  public async findByDescription(
    descricao: string
  ): Promise<UserType | undefined> {
    const userType = await this.findOne({
      where: {
        descricao,
      },
    });
    return userType;
  }

  public async getCustomUserTypesFields(): Promise<UserType[]> {
    const userTypes = await this.find({
      select: ["id", "descricao"],
    });

    return userTypes;
  }
}

export default UserTypeRepository;
