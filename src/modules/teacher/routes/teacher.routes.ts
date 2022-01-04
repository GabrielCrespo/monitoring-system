import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import TeacherController from "../controllers/TeacherController";

const teacherRouter = Router();
const teacherController = new TeacherController();

teacherRouter.get("/", teacherController.index);
teacherRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  teacherController.show
);
teacherRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      funcao: Joi.required(),
      turma: Joi.required(),
    },
  }),
  teacherController.create
);
teacherRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      funcao: Joi.required(),
      turma: Joi.required(),
    },
  }),
  teacherController.update
);

export default teacherRouter;
