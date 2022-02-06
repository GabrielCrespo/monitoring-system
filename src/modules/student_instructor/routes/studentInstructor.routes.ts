//import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import StudentInstructorController from "../controllers/StudentInstructorController";

const studentInstructorRouter = Router();
const studentInstructorController = new StudentInstructorController();

// studentInstructorRouter.get("/", studentInstructorTypeController.index);
// studentInstructorRouter.get(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//   }),
//   studentInstructorTypeController.show
// );
studentInstructorRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      matricula: Joi.string().required(),
      nome: Joi.string().required(),
      email: Joi.string().required(),
      senha: Joi.string().required(),
      data_de_nascimento: Joi.date().required(),
      tipo_aluno_instrutor: Joi.required(),
      curso: Joi.required(),
    },
  }),
  studentInstructorController.create
);
// studentInstructorRouter.put(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//     [Segments.BODY]: {
//       descricao: Joi.string().required(),
//     },
//   }),
//   studentInstructorTypeController.update
// );
// studentInstructorRouter.delete(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//   }),
//   studentInstructorTypeController.delete
// );
export default studentInstructorRouter;
