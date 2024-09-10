import { Router } from "express";
import {
	createExamresult,
	getExamresults,
	updateExamresult,
	deleteExamresults,
	countExamresults,
	getExamresultById,
} from "../controllers/examresult.controller";

const router = Router();

router.post("/create", createExamresult);

router.get("/", getExamresults);
router.get("/:examresultId", getExamresultById);
router.get("/count", countExamresults);

router.patch("/:examresultId", updateExamresult);

router.delete("/:examresultId", deleteExamresults);

export = router;
