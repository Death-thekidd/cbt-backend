import { Router } from "express";
import {
	createFaculty,
	getFaculties,
	updateFaculty,
	deleteFaculties,
	countFaculties,
} from "../controllers/faculty.controller";

const router = Router();

router.post("/create", createFaculty);

router.get("/", getFaculties);
router.get("/count", countFaculties);

router.patch("/:facultyId", updateFaculty);

router.delete("/:facultyId", deleteFaculties);

export = router;
