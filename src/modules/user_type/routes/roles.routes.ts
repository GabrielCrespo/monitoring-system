import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import UserTypeController from "../controllers/UserTypeController";

const userTypeRouter = Router();
const userTypeController = new UserTypeController();

userTypeRouter.get("/", userTypeController.index);
userTypeRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userTypeController.show
);

userTypeRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  userTypeController.create
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
  userTypeController.update
);

userTypeRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userTypeController.delete
);

export default userTypeRouter;
