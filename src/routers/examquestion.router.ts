import { Router } from "express";
import {
	createExamquestion,
	getExamquestions,
	updateExamquestion,
	deleteExamquestions,
	countExamquestions,
	bulkCreateExamQuestions,
} from "../controllers/examquestion.controller";

const router = Router();

router.post("/create", createExamquestion);
router.post("/bulkCreate", bulkCreateExamQuestions);

router.get("/", getExamquestions);
router.get("/count", countExamquestions);

router.patch("/:examquestionId", updateExamquestion);

router.delete("/:examquestionId", deleteExamquestions);

export = router;
