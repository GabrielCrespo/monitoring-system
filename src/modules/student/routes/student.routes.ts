import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import multer from "multer";
import uploadConfig from "@config/upload";
import StudentController from "../controllers/StudentController";
import StudentAvatarController from "../controllers/StudentAvatarController";

const studentRouter = Router();
const studentController = new StudentController();
const studentAvatarController = new StudentAvatarController();

const upload = multer(uploadConfig);

studentRouter.get("/", isAuthenticated, studentController.index);
studentRouter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentController.show
);
studentRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      matricula: Joi.string().required(),
      nome: Joi.string().required(),
      data_de_nascimento: Joi.date().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      curso: Joi.required(),
      turma: Joi.required(),
    },
  }),
  studentController.create
);
studentRouter.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      matricula: Joi.string().required(),
      nome: Joi.string().required(),
      data_de_nascimento: Joi.date().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      curso: Joi.required(),
      turma: Joi.required(),
    },
  }),
  studentController.update
);
studentRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentController.delete
);
studentRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  studentAvatarController.update
);
export default studentRouter;
