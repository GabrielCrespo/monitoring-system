import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcrypt";
import UserType from "@modules/user_type/typeorm/entities/UserType";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
  id: number;
  email: string;
  senha: string;
  eh_admin: boolean;
  tipo_usuario: UserType;
}

class UpdateUserService {
  public async execute({
    id,
    email,
    senha,
    eh_admin,
    tipo_usuario,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("O usuário não foi encontrado!");
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists && user.email != email) {
      throw new AppError("O email já está cadastrado!");
    }

    const hashedSenha = await bcrypt.hash(senha, 8);

    user.email = email;
    user.senha = hashedSenha;
    user.eh_admin = eh_admin;
    user.tipo_usuario = tipo_usuario;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
