import { Router } from "express";
import {
	createSemester,
	getSemesters,
	updateSemester,
	deleteSemesters,
	countSemesters,
} from "../controllers/semester.controller";

const router = Router();

router.post("/create", createSemester);

router.get("/", getSemesters);
router.get("/count", countSemesters);

router.patch("/:semesterId", updateSemester);

router.delete("/:semesterId", deleteSemesters);

export = router;
