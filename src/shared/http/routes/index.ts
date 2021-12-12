import { Router } from "express";
import courseRouter from "@modules/course/routes/course.routes";
import rolesRouter from "@modules/roles/routes/roles.routes";

const routes = Router();

routes.use("/course", courseRouter);
routes.use("/roles", rolesRouter);


export default routes;