import { EntityRepository, Repository } from "typeorm";
import Role from "../entities/Role";

@EntityRepository(Role)
class RolesRepository extends Repository<Role> {
  public async findByDescription(descricao: string): Promise<Role | undefined> {
    const role = await this.findOne({
      where: {
        descricao,
      },
    });
    return role;
  }
  
  public async findById(id: number): Promise<Role | undefined> {
    const role = await this.findOne(id);
    return role;
  }
}

export default RolesRepository;
