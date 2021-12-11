import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Role from "../typeorm/entities/Role";
import RolesRepository from "../typeorm/repositories/RolesRepository";

interface IRequest {
  id: number;
}

class ShowRoleService {
  public async execute({ id }: IRequest): Promise<Role> {
    const roleRepository = getCustomRepository(RolesRepository);

    const role = await roleRepository.findOne(id);

    if (!role) {
      throw new AppError("A função não foi encontrada!");
    }

    return role;
  }
}

export default ShowRoleService;
