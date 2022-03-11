import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findById(id: number): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async getCustomUsersFields(): Promise<User[]> {
    const users = await this.find({
      select: ["id", "email", "senha", "eh_admin", "tipo_usuario"],
    });

    return users;
  }
}

export default UserRepository;
