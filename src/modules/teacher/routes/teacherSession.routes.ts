import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import TeacherSessionController from "../controllers/TeacherSessionController";

const teacherSessionRouter = Router();
const teacherSessionController = new TeacherSessionController();


teacherSessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  teacherSessionController.create
);


export default teacherSessionRouter;
