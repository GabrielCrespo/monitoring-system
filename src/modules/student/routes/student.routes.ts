import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import StudentController from "../controllers/StudentController";

const studentRouter = Router();
const studentController = new StudentController();

studentRouter.get("/", studentController.index);
studentRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      matricula: Joi.string().required(),
      nome: Joi.string().required(),
      data_de_nascimento: Joi.date().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      curso: Joi.required(),
      turma: Joi.required(),
    },
  }),
  studentController.create
);

export default studentRouter;
