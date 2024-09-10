import { Router } from "express";
import {
	createQuestiontype,
	getQuestiontypes,
	updateQuestiontype,
	deleteQuestiontypes,
	countQuestiontypes,
} from "../controllers/questiontype.controller";

const router = Router();

router.post("/create", createQuestiontype);

router.get("/", getQuestiontypes);
router.get("/count", countQuestiontypes);

router.patch("/:questiontypeId", updateQuestiontype);

router.delete("/:questiontypeId", deleteQuestiontypes);

export = router;
