import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import UserTypeController from "../controllers/UserTypeController";

const userTypeRouter = Router();
const rolesUserTypeController = new UserTypeController();

userTypeRouter.get("/", rolesUserTypeController.index);
userTypeRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  rolesUserTypeController.show
);

userTypeRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  rolesUserTypeController.create
);

userTypeRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  rolesUserTypeController.update
);

userTypeRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  rolesUserTypeController.delete
);

export default userTypeRouter;
