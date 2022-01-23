import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import StudentController from "../controllers/StudentController";

const studentRouter = Router();
const studentController = new StudentController();

studentRouter.get("/", isAuthenticated, studentController.index);
studentRouter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentController.show
);
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
studentRouter.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
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
  studentController.update
);
studentRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentController.delete
);
export default studentRouter;
