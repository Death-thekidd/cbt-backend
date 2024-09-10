import { Router } from "express";
import {
	createExamtype,
	getExamtypes,
	updateExamtype,
	deleteExamtypes,
	countExamtypes,
} from "../controllers/examtype.controller";

const router = Router();

router.post("/create", createExamtype);

router.get("/", getExamtypes);
router.get("/count", countExamtypes);

router.patch("/:examtypeId", updateExamtype);

router.delete("/:examtypeId", deleteExamtypes);

export = router;
