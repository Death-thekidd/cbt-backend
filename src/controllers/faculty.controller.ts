import { Request, Response } from "express";
import facultyService from "../services/faculty.service";
import createResponder from "../lib/respondAndLog";

const facultyController = {
	/**
	 * Create Faculty
	 * User: Admin
	 */
	createFaculty: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_FACULTY";
		const { name } = req.body;

		try {
			const faculty = await facultyService.createFaculty({ name });
			respondAndLog({
				activity,
				status: 200,
				code: "FACULTY_CREATED",
				data: faculty,
				message: "Faculty created successfully",
			});
		} catch (error) {
			console.error(error);
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
	 * Get Faculties
	 */
	getFaculties: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_FACULTIES";

		try {
			const faculties = await facultyService.getFaculties();
			respondAndLog({
				activity,
				status: 200,
				code: "FACULTIES_FETCHED",
				data: faculties,
				message: "Faculties fetched successfully",
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
	 * Count Faculties
	 */
	countFaculties: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_FACULTIES";

		try {
			const facultiesCount = await facultyService.countFaculties();
			respondAndLog({
				activity,
				status: 200,
				code: "FACULTIES_COUNTED",
				data: facultiesCount,
				message: "Faculties counted successfully",
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

	// Update Faculty
	updateFaculty: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_FACULTY";
		const facultyId = req.params.facultyId;
		const { name } = req.body;

		try {
			const faculty = await facultyService.updateFaculty({
				facultyId,
				data: { name },
			});
			respondAndLog({
				activity,
				status: 200,
				code: "FACULTY_UPDATED",
				data: faculty,
				message: "Faculty updated successfully",
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
	 * Delete Faculty
	 */
	deleteFaculties: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_FACULTY";
		const facultyId = req.params.facultyId;
		console.log(facultyId);

		try {
			const result = await facultyService.deleteFaculty(facultyId);
			respondAndLog({
				activity,
				status: 200,
				code: "FACULTY_DELETED",
				data: result,
				message: "Faculty deleted successfully",
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

export = facultyController;
