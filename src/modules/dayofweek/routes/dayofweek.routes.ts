import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import DayOfWeekController from "../controllers/DayOfWeekController";

const dayOfWeekRouter = Router();
const dayOfWeekController = new DayOfWeekController();

dayOfWeekRouter.get("/", dayOfWeekController.index);
dayOfWeekRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  dayOfWeekController.show
);

dayOfWeekRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  dayOfWeekController.create
);

// dayOfWeekRouter.put(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//     [Segments.BODY]: {
//       descricao: Joi.string().required(),
//     },
//   }),
//   courseController.update
// );

// dayOfWeekRouter.delete(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//   }),
//   courseController.delete
// );

export default dayOfWeekRouter;
