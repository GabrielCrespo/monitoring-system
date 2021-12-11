import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Role from "../typeorm/entities/Role";
import RolesRepository from "../typeorm/repositories/RolesRepository";

interface IRequest {
  descricao: string;
}

class CreateRoleService {
  public async execute({ descricao }: IRequest): Promise<Role> {
    const roleRepository = getCustomRepository(RolesRepository);

    const roleExists = await roleRepository.findByDescription(descricao);

    if (roleExists) {
      throw new AppError("Essa função já está cadastrada!");
    }

    const role = roleRepository.create({
      descricao,
    });

    await roleRepository.save(role);

    return role;
  }
}

export default CreateRoleService;
