import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import TeamController from "../controllers/TeamController";

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get("/", teamController.index);
teamRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  teamController.show
);

teamRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      hora_inicio: Joi.string().required(),
      hora_fim: Joi.string().required(),
      dias_da_semana: Joi.array().required(),
    },
  }),
  teamController.create
);

teamRouter.put(
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
  teamController.update
);

teamRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  teamController.delete
);

export default teamRouter;
