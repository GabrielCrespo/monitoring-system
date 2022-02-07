import { Request, Response } from "express";
import UpdateStudentInstructorAvatarService from "../services/UpdateStudentInstructorAvatarService";

class StudentInstructorAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateStudentInstructorAvatarService();

    const studentInstructor = updateAvatar.execute({
      student_instructor_id: Number.parseInt(request.user.id),
      avatarFilename: request.file?.filename!,
    });

    return response.json(studentInstructor);
  }
}

export default StudentInstructorAvatarController;
