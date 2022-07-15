import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import MonitoringTimeController from "../controllers/MonitoringTimeController";

const monitoringTimeRouter = Router();
const monitoringTimeController = new MonitoringTimeController();

monitoringTimeRouter.get("/", monitoringTimeController.index);
// monitoringTimeRouter.get(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//   }),
//   monitoringTimeController.show
// );

// monitoringTimeRouter.post(
//   "/",
//   celebrate({
//     [Segments.BODY]: {
//       dia_da_semana: Joi.required(),
//       hora_inicio: Joi.required(),
//       hora_fim: Joi.required(),
//     },
//   }),
//   monitoringTimeController.create
// );

// monitoringTimeRouter.put(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//     [Segments.BODY]: {
//       descricao: Joi.string().required(),
//     },
//   }),
//   monitoringTimeController.update
// );

// monitoringTimeRouter.delete(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//   }),
//   monitoringTimeController.delete
// );

export default monitoringTimeRouter;
