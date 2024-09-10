import { Request, Response } from "express";
import levelService from "../services/level.service";
import createResponder from "../lib/respondAndLog";

const levelController = {
	/**
	 * Create Level
	 * User: Admin
	 */
	createLevel: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_LEVEL";
		const { name } = req.body;

		try {
			const level = await levelService.createLevel({ name });
			respondAndLog({
				activity,
				status: 200,
				code: "LEVEL_CREATED",
				data: level,
				message: "Level created successfully",
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
	 * Get Levels
	 */
	getLevels: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_LEVELS";

		try {
			const levels = await levelService.getLevels();
			respondAndLog({
				activity,
				status: 200,
				code: "LEVELS_FETCHED",
				data: levels,
				message: "Levels fetched successfully",
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
	 * Count Levels
	 */
	countLevels: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_LEVELS";

		try {
			const levelsCount = await levelService.countLevels();
			respondAndLog({
				activity,
				status: 200,
				code: "LEVELS_COUNTED",
				data: levelsCount,
				message: "Levels counted successfully",
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

	// Update Level
	updateLevel: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_LEVEL";
		const levelId = req.params.levelId;
		const { name } = req.body;

		try {
			const level = await levelService.updateLevel({ levelId, data: { name } });
			respondAndLog({
				activity,
				status: 200,
				code: "LEVEL_UPDATED",
				data: level,
				message: "Level updated successfully",
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
	 * Delete Level
	 */
	deleteLevels: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_LEVEL";
		const levelId = req.params.levelId;

		try {
			const result = await levelService.deleteLevel(levelId);
			respondAndLog({
				activity,
				status: 200,
				code: "LEVEL_DELETED",
				data: result,
				message: "Level deleted successfully",
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

export = levelController;
