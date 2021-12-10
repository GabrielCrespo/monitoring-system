import { Request, Response } from "express";
import CreateCourseService from "../services/CreateCourseService";

class CourseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;

    const createCourseService = new CreateCourseService();

    const course = await createCourseService.execute({ descricao });

    return response.json(course);
  }
}

export default CourseController;
