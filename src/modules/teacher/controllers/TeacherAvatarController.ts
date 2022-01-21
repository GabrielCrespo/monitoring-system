import { Request, Response } from "express";
import UpdateTeacherAvatarService from "../services/UpdateTeacherAvatarService";

class TeacherAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateTeacherAvatarService();

    const teacher = updateAvatar.execute({
      teacher_id: Number.parseInt(request.user.id),
      avatarFilename: request.file?.filename!,
    });

    return response.json(teacher);
  }
}

export default TeacherAvatarController;
