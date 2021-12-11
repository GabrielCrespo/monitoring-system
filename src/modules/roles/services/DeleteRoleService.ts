import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Role from "../typeorm/entities/Role";
import RolesRepository from "../typeorm/repositories/RolesRepository";

interface IRequest {
  id: number;
}

class DeleteRoleService {
  public async execute({ id }: IRequest): Promise<void> {
    const roleRepository = getCustomRepository(RolesRepository);

    const role = await roleRepository.findOne(id);

    if (!role) {
      throw new AppError("A função não foi encontrada!");
    }

    await roleRepository.remove(role);
  }
}

export default DeleteRoleService;
