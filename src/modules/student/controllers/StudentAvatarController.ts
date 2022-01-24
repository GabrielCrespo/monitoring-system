import { Request, Response } from "express";
import UpdateStudentAvatarService from "../services/UpdateStudentAvatarService";

class StudentAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateStudentAvatarService();

    const student = updateAvatar.execute({
      student_id: Number.parseInt(request.user.id),
      avatarFilename: request.file?.filename!,
    });

    return response.json(student);
  }
}

export default StudentAvatarController;
