import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ClassController from "../controllers/ClassController";

const classRouter = Router();
const classController = new ClassController();

// classRouter.get("/", classController.index);
// classRouter.get(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//   }),
//   classController.show
// );

classRouter.post(
  "/",
  // celebrate({
  //   [Segments.BODY]: {
  //     descricao: Joi.string().required(),
  //   },
  // }),
  classController.create
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

export default classRouter;
