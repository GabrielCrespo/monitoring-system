import { Router } from "express";
import courseRouter from "@modules/course/routes/course.routes";
import rolesRouter from "@modules/roles/routes/roles.routes";
import dayOfWeekRouter from "@modules/dayofweek/routes/dayofweek.routes";
import classRouter from "@modules/class/routes/class.routes";
import teacherRouter from "@modules/teacher/routes/teacher.routes";
import teacherSessionRouter from "@modules/teacher/routes/teacherSession.routes";

const routes = Router();

routes.use("/course", courseRouter);
routes.use("/role", rolesRouter);
routes.use("/dayOfWeek", dayOfWeekRouter);
routes.use("/class", classRouter);
routes.use("/teacher", teacherRouter);
routes.use("/teacher-sessions", teacherSessionRouter);

export default routes;
