import { Router } from "express";
import {
	createLevel,
	getLevels,
	updateLevel,
	deleteLevels,
	countLevels,
} from "../controllers/level.controller";

const router = Router();

router.post("/create", createLevel);

router.get("/", getLevels);
router.get("/count", countLevels);

router.patch("/:levelId", updateLevel);

router.delete("/:levelId", deleteLevels);

export = router;
