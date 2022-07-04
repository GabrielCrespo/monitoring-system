import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import GenderController from "../controllers/GenderController";

const genderRouter = Router();
const genderController = new GenderController();

genderRouter.get("/", genderController.index);
genderRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  genderController.show
);

genderRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  genderController.create
);

genderRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  genderController.update
);

genderRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  genderController.delete
);

export default genderRouter;
