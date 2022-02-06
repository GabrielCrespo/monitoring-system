import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import StudentInstructorSessionController from "../controllers/StudentInstructorSessionController";

const studentInstructorSessionRouter = Router();
const studentInstructorSessionController =
  new StudentInstructorSessionController();

studentInstructorSessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  studentInstructorSessionController.create
);

export default studentInstructorSessionRouter;
