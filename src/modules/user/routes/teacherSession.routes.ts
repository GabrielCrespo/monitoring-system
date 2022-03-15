import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UserSessionController from "../controllers/UserSessionController";

const userSessionRouter = Router();
const userSessionController = new UserSessionController();

userSessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  userSessionController.create
);

export default userSessionRouter;
