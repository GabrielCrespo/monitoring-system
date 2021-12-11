import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CourseController from "../controllers/CourseController";

const courseRouter = Router();
const courseController = new CourseController();

courseRouter.get("/", courseController.index);
courseRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  courseController.show
);

courseRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  courseController.create
);

courseRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  courseController.update
);

courseRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  courseController.delete
);

export default courseRouter;
