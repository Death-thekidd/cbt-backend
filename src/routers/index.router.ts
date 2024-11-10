import { Router } from "express";
import userRouter from "../routers/user.router";
import backlogRouter from "../routers/backlog.router";
import facultyRouter from "../routers/faculty.router";
import departmentRouter from "../routers/department.router";
import sessionRouter from "../routers/session.router";
import semesterRouter from "../routers/semester.router";
import levelRouter from "../routers/level.router";
import courseRouter from "../routers/course.router";
import examRouter from "../routers/exam.router";
import examquestionRouter from "../routers/examquestion.router";
import examresultRouter from "./result.router";
import examstudentRouter from "../routers/examstudent.router";
import questionRouter from "../routers/question.router";

const router = Router();

router.use("/users", userRouter);
router.use("/backlogs", backlogRouter);
router.use("/faculties", facultyRouter);
router.use("/departments", departmentRouter);
router.use("/sessions", sessionRouter);
router.use("/semesters", semesterRouter);
router.use("/levels", levelRouter);
router.use("/courses", courseRouter);
router.use("/exams", examRouter);
router.use("/examquestions", examquestionRouter);
router.use("/results", examresultRouter);
router.use("/examstudents", examstudentRouter);
router.use("/questions", questionRouter);

export default router;
