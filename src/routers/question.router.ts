import { Router } from "express";
import {
	createQuestion,
	getQuestions,
	updateQuestion,
	deleteQuestions,
	countQuestions,
	getQuestionById,
	bulkCreateQuestion,
} from "../controllers/question.controller";

const router = Router();

router.post("/create", createQuestion);
router.post("/bulk-create", bulkCreateQuestion);

router.get("/", getQuestions);
router.get("/:questionId", getQuestionById);
router.get("/count", countQuestions);

router.patch("/:questionId", updateQuestion);

router.delete("/:questionId", deleteQuestions);

export = router;
