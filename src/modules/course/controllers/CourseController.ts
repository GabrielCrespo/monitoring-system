import { Request, Response } from "express";
import CreateCourseService from "../services/CreateCourseService";
import DeleteCourseService from "../services/DeleteCourseService";
import ListCourseService from "../services/ListCourseService";
import ShowCourseService from "../services/ShowCourseService";
import UpdateCourseService from "../services/UpdateCourseService";

class CourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourseService = new ListCourseService();

    const courses = await listCourseService.execute();

    return response.json(courses);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCourseService = new ShowCourseService();

    const course = await showCourseService.execute({ id: Number.parseInt(id) });

    return response.json(course);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;

    const createCourseService = new CreateCourseService();

    const course = await createCourseService.execute({ descricao });

    return response.json(course);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { descricao } = request.body;
    const { id } = request.params;

    const updateCourseService = new UpdateCourseService();

    const course = await updateCourseService.execute({
      id: Number.parseInt(id),
      descricao,
    });

    return response.json(course);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCourseService = new DeleteCourseService();

    await deleteCourseService.execute({ id: Number.parseInt(id) });

    return response.json([]);
  }
}

export default CourseController;
