import { Router } from "express";
import {
	createCourse,
	getCourses,
	updateCourse,
	deleteCourses,
	countCourses,
	getCourseById,
} from "../controllers/course.controller";

const router = Router();

router.post("/create", createCourse);

router.get("/", getCourses);
router.get("/count", countCourses);
router.get("/:courseId", getCourseById);

router.patch("/:courseId", updateCourse);

router.delete("/:courseId", deleteCourses);

export = router;
