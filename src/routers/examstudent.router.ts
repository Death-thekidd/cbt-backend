import { Router } from "express";
import {
	addStudents,
	addStudents2,
	getAddedStudents,
	removeStudent,
} from "../controllers/examstudent.controller";

const router = Router();

// Route to add students to an exam
router.post("/:examId/students", addStudents2);

// Route to get all students added to an exam
router.get("/:examId/students", getAddedStudents);

// Route to remove a student from an exam
router.delete("/:examId/students/:studentId", removeStudent);

export = router;