import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";
import UserType from "@modules/user_type/typeorm/entities/UserType";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";

interface IRequest {
  email: string;
  senha: string;
  tipo_usuario: UserType;
}

class CreateUserService {
  public async execute({
    email,
    senha,
    tipo_usuario,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("O email já está cadastrado!");
    }

    const senhaHash = await bcrypt.hash(senha, 8);

    const user = userRepository.create({
      email,
      senha: senhaHash,
      tipo_usuario,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
