import { Router } from "express";
import courseRouter from "@modules/course/routes/course.routes";
import rolesRouter from "@modules/roles/routes/roles.routes";
import dayOfWeekRouter from "@modules/dayofweek/routes/dayofweek.routes";
import teamRouter from "@modules/class/routes/team.routes";
import teacherRouter from "@modules/teacher/routes/teacher.routes";
import teacherSessionRouter from "@modules/teacher/routes/teacherSession.routes";
import studentRouter from "@modules/student/routes/student.routes";
import studentSessionRouter from "@modules/student/routes/studentSession.routes";

const routes = Router();

routes.use("/course", courseRouter);
routes.use("/role", rolesRouter);
routes.use("/dayOfWeek", dayOfWeekRouter);
routes.use("/team", teamRouter);
routes.use("/teacher", teacherRouter);
routes.use("/student", studentRouter);

routes.use("/teacher-sessions", teacherSessionRouter);
routes.use("/student-sessions", studentSessionRouter);

export default routes;
