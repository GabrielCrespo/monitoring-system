//import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import multer from "multer";
import uploadConfig from "@config/upload";
import StudentInstructorController from "../controllers/StudentInstructorController";
import StudentInstructorAvatarController from "../controllers/StudentInstructorAvatarController";
import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";

const studentInstructorRouter = Router();
const studentInstructorController = new StudentInstructorController();
const studentInstructorAvatarController =
  new StudentInstructorAvatarController();

const upload = multer(uploadConfig);

studentInstructorRouter.get("/", studentInstructorController.index);
studentInstructorRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentInstructorController.show
);
studentInstructorRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      matricula: Joi.string().required(),
      nome: Joi.string().required(),
      email: Joi.string().required(),
      senha: Joi.string().required(),
      telefone: Joi.string().required(),
      idade: Joi.number().required(),
      ehCotista: Joi.boolean().required(),
      data_de_nascimento: Joi.date().required(),
      tipo_instrutor: Joi.required(),
      curso: Joi.required(),
      genero: Joi.required(),
    },
  }),
  studentInstructorController.create
);
studentInstructorRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      matricula: Joi.string().required(),
      nome: Joi.string().required(),
      email: Joi.string().required(),
      senha: Joi.string().required(),
      telefone: Joi.string().required(),
      idade: Joi.number().required(),
      ehCotista: Joi.boolean().required(),
      data_de_nascimento: Joi.date().required(),
      tipo_instrutor: Joi.required(),
      curso: Joi.required(),
      genero: Joi.required(),
    },
  }),
  studentInstructorController.update
);
studentInstructorRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentInstructorController.delete
);
studentInstructorRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  studentInstructorAvatarController.update
);
export default studentInstructorRouter;
