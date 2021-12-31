import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ClassController from "../controllers/ClassController";

const classRouter = Router();
const classController = new ClassController();

classRouter.get("/", classController.index);
classRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  classController.show
);

classRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      hora_inicio: Joi.string().required(),
      hora_fim: Joi.string().required(),
      dias_da_semana: Joi.array().required(),
    },
  }),
  classController.create
);

classRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      hora_inicio: Joi.string().required(),
      hora_fim: Joi.string().required(),
      dias_da_semana: Joi.array().required(),
    },
  }),
  classController.update
);

classRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  classController.delete
);

export default classRouter;
