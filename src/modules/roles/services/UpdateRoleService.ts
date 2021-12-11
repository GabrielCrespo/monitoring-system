import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Role from "../typeorm/entities/Role";
import RolesRepository from "../typeorm/repositories/RolesRepository";

interface IRequest {
  id: number;
  descricao: string;
}

class UpdateRoleService {
  public async execute({ id, descricao }: IRequest): Promise<Role> {
    const roleRepository = getCustomRepository(RolesRepository);

    const role = await roleRepository.findOne(id);

    if (!role) {
      throw new AppError("A função não foi encontrada!");
    }

    const descricaoExists = await roleRepository.findByDescription(descricao);

    if (descricaoExists && role.descricao !== descricao) {
      throw new AppError("Já existe uma função cadastrada com essa descrição!");
    }

    role.descricao = descricao;

    await roleRepository.save(role);

    return role;
  }
}

export default UpdateRoleService;
