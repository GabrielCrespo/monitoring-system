import { Router } from "express";
import courseRouter from "@modules/course/routes/course.routes";
import dayOfWeekRouter from "@modules/dayofweek/routes/dayofweek.routes";
import teamRouter from "@modules/class/routes/team.routes";
import teacherRouter from "@modules/teacher/routes/teacher.routes";
import studentRouter from "@modules/student/routes/student.routes";
import studentInstructorRouter from "@modules/student_instructor/routes/studentInstructor.routes";
import userTypeRouter from "@modules/user_type/routes/roles.routes";
import userRouter from "@modules/user/routes/user.routes";
import userSessionRouter from "@modules/user/routes/teacherSession.routes";
import genderRouter from "@modules/gender/routes/gender.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/user-type", userTypeRouter);
routes.use("/user-session", userSessionRouter);

routes.use("/course", courseRouter);
routes.use("/dayOfWeek", dayOfWeekRouter);
routes.use("/team", teamRouter);
routes.use("/teacher", teacherRouter);
routes.use("/student", studentRouter);
routes.use("/student-instructor", studentInstructorRouter);
routes.use("/gender", genderRouter);

export default routes;
