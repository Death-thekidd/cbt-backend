import { Router } from "express";
import {
	getBacklogs,
	getBacklogById,
	getBacklogByUserId,
} from "../controllers/backlog.controller";

const router = Router();

router.get("/", getBacklogs);
router.get("/:backlogId", getBacklogById);
router.get("/user/:userId", getBacklogByUserId);

export = router;
