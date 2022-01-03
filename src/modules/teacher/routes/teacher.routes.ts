import { Router } from "express";
import TeacherController from "../controllers/TeacherController";

const teacherRouter = Router();
const teacherController = new TeacherController();

teacherRouter.get("/", teacherController.index);
teacherRouter.get("/:id", teacherController.show);
teacherRouter.post("/", teacherController.create);

export default teacherRouter;
