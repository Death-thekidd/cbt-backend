import { Router } from "express";
import {
	addQuestion,
	removeQuestion,
	getQuestionsForExam,
	getAddedQuestions,
	countExamquestions,
} from "../controllers/examquestion.controller";

const router = Router();

// Route to add a question to an exam
router.post("/:examId/questions", addQuestion);

// Route to get all questions for an exam
router.get("/:examId/questions", getQuestionsForExam);

// Route to get only added questions for an exam
router.get("/:examId/added-questions", getAddedQuestions);

// Route to count all exam questions
router.get("/count", countExamquestions);

// Route to remove a question from an exam
router.delete("/:examId/questions/:questionId", removeQuestion);

export = router;
