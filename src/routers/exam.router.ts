import { Router } from "express";
import {
	createExam,
	getExams,
	updateExam,
	deleteExams,
	countExams,
	getExamById,
} from "../controllers/exam.controller";

const router = Router();

router.post("/create", createExam);

router.get("/", getExams);
router.get("/:examId", getExamById);
router.get("/count", countExams);

router.patch("/:examId", updateExam);

router.delete("/:examId", deleteExams);

export = router;
