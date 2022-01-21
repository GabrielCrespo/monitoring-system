import upload from "@config/upload";
import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import Teacher from "../typeorm/entities/Teacher";
import TeacherRepository from "../typeorm/repositories/TeacherRepository";
import fs from "fs";

interface IRequest {
  teacher_id: number;
  avatarFilename: string;
}

class UpdateTeacherAvatarService {
  public async execute({
    teacher_id,
    avatarFilename,
  }: IRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(TeacherRepository);

    const teacher = await teacherRepository.findById(teacher_id);

    if (!teacher) {
      throw new AppError("Professor não encontrado!");
    }

    if (teacher.avatar) {
      const teacherAvatarFilePath = path.join(upload.directory, teacher.avatar);
      const teacherAvatarFileExists = await fs.promises.stat(
        teacherAvatarFilePath
      );

      if (teacherAvatarFileExists) {
        await fs.promises.unlink(teacherAvatarFilePath);
      }
    }

    teacher.avatar = avatarFilename;

    await teacherRepository.save(teacher);

    return teacher;
  }
}

export default UpdateTeacherAvatarService;
