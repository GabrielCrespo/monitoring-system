import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import StudentSessionController from "../controllers/StudentSessionController";

const studentSessionRouter = Router();
const studentSessionController = new StudentSessionController();

studentSessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  studentSessionController.create
);

export default studentSessionRouter;
