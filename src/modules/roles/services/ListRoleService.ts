import { getCustomRepository } from "typeorm";
import Role from "../typeorm/entities/Role";
import RolesRepository from "../typeorm/repositories/RolesRepository";

class ListRoleService {
  public async execute(): Promise<Role[]> {
    const roleRepository = getCustomRepository(RolesRepository);

    const roles = await roleRepository.find();

    return roles;
  }
}

export default ListRoleService;
