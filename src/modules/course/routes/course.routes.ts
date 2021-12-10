import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CourseController from "../controllers/CourseController";

const courseRouter = Router();
const courseController = new CourseController();

courseRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  courseController.create
);

export default courseRouter;
