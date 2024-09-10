import { Request, Response } from "express";
import semesterService from "../services/semester.service";
import createResponder from "../lib/respondAndLog";

const semesterController = {
	/**
	 * Create Semester
	 * User: Admin
	 */
	createSemester: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_SEMESTER";
		const { name } = req.body;

		try {
			const semester = await semesterService.createSemester({ name });
			respondAndLog({
				activity,
				status: 200,
				code: "SEMESTER_CREATED",
				data: semester,
				message: "Semester created successfully",
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
	 * Get Semesters
	 */
	getSemesters: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_SEMESTERS";

		try {
			const semesters = await semesterService.getSemesters();
			respondAndLog({
				activity,
				status: 200,
				code: "SEMESTERS_FETCHED",
				data: semesters,
				message: "Semesters fetched successfully",
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
	 * Count Semesters
	 */
	countSemesters: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_SEMESTERS";

		try {
			const semestersCount = await semesterService.countSemesters();
			respondAndLog({
				activity,
				status: 200,
				code: "SEMESTERS_COUNTED",
				data: semestersCount,
				message: "Semesters counted successfully",
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

	// Update Semester
	updateSemester: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_SEMESTER";
		const semesterId = req.params.semesterId;
		const { name } = req.body;

		try {
			const semester = await semesterService.updateSemester({
				semesterId,
				data: { name },
			});
			respondAndLog({
				activity,
				status: 200,
				code: "SEMESTER_UPDATED",
				data: semester,
				message: "Semester updated successfully",
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
	 * Delete Semester
	 */
	deleteSemesters: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_SEMESTER";
		const semesterId = req.params.semesterId;

		try {
			const result = await semesterService.deleteSemester(semesterId);
			respondAndLog({
				activity,
				status: 200,
				code: "SEMESTER_DELETED",
				data: result,
				message: "Semester deleted successfully",
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

export = semesterController;
