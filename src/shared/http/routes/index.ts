import { Router } from "express";
import courseRouter from "@modules/course/routes/course.routes";
import rolesRouter from "@modules/roles/routes/roles.routes";
import dayOfWeekRouter from "@modules/dayofweek/routes/dayofweek.routes";
import teamRouter from "@modules/class/routes/team.routes";
import teacherRouter from "@modules/teacher/routes/teacher.routes";
import teacherSessionRouter from "@modules/teacher/routes/teacherSession.routes";
import studentRouter from "@modules/student/routes/student.routes";
import studentSessionRouter from "@modules/student/routes/studentSession.routes";
import studentInstructorTypeRouter from "@modules/student_instructor_type/routes/studentInstructorType.routes";
import studentInstructorRouter from "@modules/student_instructor/routes/studentInstructor.routes";
import studentInstructorSessionRouter from "@modules/student_instructor/routes/studentInstructorSession.routes";
import userTypeRouter from "@modules/user_type/routes/roles.routes";
import userRouter from "@modules/user/routes/user.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/user-type", userTypeRouter);

routes.use("/course", courseRouter);
routes.use("/role", rolesRouter);
routes.use("/dayOfWeek", dayOfWeekRouter);
routes.use("/team", teamRouter);
routes.use("/teacher", teacherRouter);
routes.use("/student", studentRouter);
routes.use("/student-instructor", studentInstructorRouter);
routes.use("/student-instructor-type", studentInstructorTypeRouter);

routes.use("/teacher-sessions", teacherSessionRouter);
routes.use("/student-sessions", studentSessionRouter);
routes.use("/student-instructor-sessions", studentInstructorSessionRouter);

export default routes;
