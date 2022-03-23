import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import TeacherController from "../controllers/TeacherController";
import multer from "multer";
import uploadConfig from "@config/upload";
import TeacherAvatarController from "../controllers/TeacherAvatarController";

const teacherRouter = Router();
const teacherController = new TeacherController();
const teacherAvatarController = new TeacherAvatarController();

const upload = multer(uploadConfig);

teacherRouter.get("/", teacherController.index);
teacherRouter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  teacherController.show
);
teacherRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      turma: Joi.required(),
    },
  }),
  teacherController.create
);
teacherRouter.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      turma: Joi.required(),
    },
  }),
  teacherController.update
);
teacherRouter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  teacherController.delete
);
teacherRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  teacherAvatarController.update
);

export default teacherRouter;
