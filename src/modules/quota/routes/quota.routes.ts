import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import QuotaController from "../controllers/QuotaController";

const quotaRouter = Router();
const quotaController = new QuotaController();

quotaRouter.get("/", quotaController.index);
quotaRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  quotaController.show
);

quotaRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  quotaController.create
);

quotaRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  quotaController.update
);

quotaRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  quotaController.delete
);

export default quotaRouter;
