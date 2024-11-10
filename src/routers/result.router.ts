import { Router } from "express";
import {
	submitExamResult,
	getExamResult,
	getAllExamResults,
} from "../controllers/result.controller";

const router = Router();

// Route to submit exam result
router.post("/submit", submitExamResult);

// Route to fetch a specific student's exam result
router.get("/:studentId/:examId", getExamResult);

// Route to fetch all results for a specific exam
router.get("/:examId", getAllExamResults);

export = router;
