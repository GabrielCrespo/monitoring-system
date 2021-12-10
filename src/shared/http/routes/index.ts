import { Router } from "express";
import courseRouter from "@modules/course/routes/course.routes";

const routes = Router();

routes.use("/course", courseRouter);


export default routes;