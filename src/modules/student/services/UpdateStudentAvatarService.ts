import upload from "@config/upload";
import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import Student from "../typeorm/entities/Student";
import StudentRepository from "../typeorm/repositories/StudentRepository";
import fs from "fs";

interface IRequest {
  student_id: number;
  avatarFilename: string;
}

class UpdateStudentAvatarService {
  public async execute({
    student_id,
    avatarFilename,
  }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);

    const student = await studentRepository.findById(student_id);

    if (!student) {
      throw new AppError("Professor não encontrado!");
    }

    if (student.avatar) {
      const studentAvatarFilePath = path.join(upload.directory, student.avatar);
      const studentAvatarFileExists = await fs.promises.stat(
        studentAvatarFilePath
      );

      if (studentAvatarFileExists) {
        await fs.promises.unlink(studentAvatarFilePath);
      }
    }

    student.avatar = avatarFilename;

    await studentRepository.save(student);

    return student;
  }
}

export default UpdateStudentAvatarService;
