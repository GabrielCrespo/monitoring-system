import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import RolesController from "../controllers/RolesController";

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.get("/", rolesController.index);
rolesRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  rolesController.show
);

rolesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  rolesController.create
);

rolesRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  rolesController.update
);

rolesRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  rolesController.delete
);

export default rolesRouter;