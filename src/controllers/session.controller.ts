import { Request, Response } from "express";
import sessionService from "../services/session.service";
import createResponder from "../lib/respondAndLog";

const sessionController = {
	/**
	 * Create Session
	 * User: Admin
	 */
	createSession: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_SESSION";
		const { name } = req.body;

		try {
			const session = await sessionService.createSession({ name });
			respondAndLog({
				activity,
				status: 200,
				code: "SESSION_CREATED",
				data: session,
				message: "Session created successfully",
			});
		} catch (error) {
			console.error(error);
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.stack,
				message: "Something went wrong, contact support",
			});
		}
	},

	/**
	 * Get Sessions
	 */
	getSessions: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_SESSIONS";

		try {
			const sessions = await sessionService.getSessions();
			respondAndLog({
				activity,
				status: 200,
				code: "SESSIONS_FETCHED",
				data: sessions,
				message: "Sessions fetched successfully",
			});
		} catch (error) {
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.message,
				message: "Something went wrong, contact support",
			});
		}
	},

	/**
	 * Count Sessions
	 */
	countSessions: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_SESSIONS";

		try {
			const sessionsCount = await sessionService.countSessions();
			respondAndLog({
				activity,
				status: 200,
				code: "SESSIONS_COUNTED",
				data: sessionsCount,
				message: "Sessions counted successfully",
			});
		} catch (error) {
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.stack,
				message: "Something went wrong, contact support",
			});
		}
	},

	// Update Session
	updateSession: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_SESSION";
		const sessionId = req.params.sessionId;
		const { name } = req.body;

		try {
			const session = await sessionService.updateSession({
				sessionId,
				data: { name },
			});
			respondAndLog({
				activity,
				status: 200,
				code: "SESSION_UPDATED",
				data: session,
				message: "Session updated successfully",
			});
		} catch (error) {
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.message,
				message: "Something went wrong, contact support",
			});
		}
	},

	/**
	 * Delete Session
	 */
	deleteSessions: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_SESSION";
		const sessionId = req.params.sessionId;

		try {
			const result = await sessionService.deleteSession(sessionId);
			respondAndLog({
				activity,
				status: 200,
				code: "SESSION_DELETED",
				data: result,
				message: "Session deleted successfully",
			});
		} catch (error) {
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.stack,
				message: "Something went wrong, contact support",
			});
		}
	},
};

export = sessionController;
