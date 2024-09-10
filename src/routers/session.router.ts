import { Router } from "express";
import {
	createSession,
	getSessions,
	updateSession,
	deleteSessions,
	countSessions,
} from "../controllers/session.controller";

const router = Router();

router.post("/create", createSession);

router.get("/", getSessions);
router.get("/count", countSessions);

router.patch("/:sessionId", updateSession);

router.delete("/:sessionId", deleteSessions);

export = router;
