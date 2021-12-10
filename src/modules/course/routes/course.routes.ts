import routes from "@shared/http/routes";
import { Router } from "express";
import CourseController from "../controllers/CourseController";

const courseRouter = Router();
const courseController = new CourseController();

courseRouter.post("/", courseController.create);

export default courseRouter;