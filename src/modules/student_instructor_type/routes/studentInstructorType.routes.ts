//import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
// import multer from "multer";
// import uploadConfig from "@config/upload";
//import StudentAvatarController from "../controllers/StudentAvatarController";
import StudentInstructorTypeController from "../controllers/StudentInstructorTypeController";

const studentInstructorTypeRouter = Router();
const studentInstructorTypeController = new StudentInstructorTypeController();
// const studentAvatarController = new StudentAvatarController();

//const upload = multer(uploadConfig);

studentInstructorTypeRouter.get("/", studentInstructorTypeController.index);
studentInstructorTypeRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  studentInstructorTypeController.show
);
studentInstructorTypeRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  studentInstructorTypeController.create
);
studentInstructorTypeRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
    },
  }),
  studentInstructorTypeController.update
);
// studentRouter.delete(
//   "/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().required(),
//     },
//   }),
//   studentController.delete
// );
// studentRouter.patch(
//   "/avatar",
//   isAuthenticated,
//   upload.single("avatar"),
//   studentAvatarController.update
// );
export default studentInstructorTypeRouter;
