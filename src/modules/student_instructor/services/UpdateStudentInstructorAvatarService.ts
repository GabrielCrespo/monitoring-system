import upload from "@config/upload";
import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import fs from "fs";
import StudentInstructor from "../typeorm/entities/StudentInstructor";
import StudentInstructorRepository from "../typeorm/repositories/StudentInstructorRepository";

interface IRequest {
  student_instructor_id: number;
  avatarFilename: string;
}

class UpdateStudentInstructorAvatarService {
  public async execute({
    student_instructor_id,
    avatarFilename,
  }: IRequest): Promise<StudentInstructor> {
    const studentInstructorRepository = getCustomRepository(
      StudentInstructorRepository
    );

    const studentInstructor = await studentInstructorRepository.findById(
      student_instructor_id
    );

    if (!studentInstructor) {
      throw new AppError("Professor não encontrado!");
    }

    if (studentInstructor.avatar) {
      const studentInstructorAvatarFilePath = path.join(
        upload.directory,
        studentInstructor.avatar
      );
      const studentInstructorAvatarFileExists = await fs.promises.stat(
        studentInstructorAvatarFilePath
      );

      if (studentInstructorAvatarFileExists) {
        await fs.promises.unlink(studentInstructorAvatarFilePath);
      }
    }

    studentInstructor.avatar = avatarFilename;

    await studentInstructorRepository.save(studentInstructor);

    return studentInstructor;
  }
}

export default UpdateStudentInstructorAvatarService;
