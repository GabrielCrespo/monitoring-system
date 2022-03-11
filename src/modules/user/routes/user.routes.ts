import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.index);
userRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userController.show
);
userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      tipo_usuario: Joi.required(),
    },
  }),
  userController.create
);
userRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      eh_admin: Joi.boolean().required(),
      tipo_usuario: Joi.required(),
    },
  }),
  userController.update
);
userRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userController.delete
);

export default userRouter;
