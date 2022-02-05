//import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import StudentInstructorTypeController from "../controllers/StudentInstructorTypeController";

const studentInstructorTypeRouter = Router();
const studentInstructorTypeController = new StudentInstructorTypeController();

studentInstructorTypeRouter.get("/", studentInstructorTypeController.index);
studentInstructorTypeRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentInstructorTypeController.show
);
studentInstructorTypeRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  studentInstructorTypeController.create
);
studentInstructorTypeRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  studentInstructorTypeController.update
);
studentInstructorTypeRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentInstructorTypeController.delete
);
export default studentInstructorTypeRouter;
