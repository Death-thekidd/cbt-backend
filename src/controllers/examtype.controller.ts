import { Request, Response } from "express";
import examtypeService from "../services/examtype.service";
import createResponder from "../lib/respondAndLog";

const examtypeController = {
	/**
	 * Create Examtype
	 * User: Admin
	 */
	createExamtype: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_EXAMTYPE";
		const { name, code, departmentId, levelId, semesterId } = req.body;

		try {
			const examtype = await examtypeService.createExamtype({
				name,
				code,
				departmentId,
				levelId,
				semesterId,
			});
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMTYPE_CREATED",
				data: examtype,
				message: "Examtype created successfully",
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
	 * Get Examtypes
	 */
	getExamtypes: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_EXAMTYPES";

		try {
			const examtypes = await examtypeService.getExamtypes();
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMTYPES_FETCHED",
				data: examtypes,
				message: "Examtypes fetched successfully",
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
	 * Count Examtypes
	 */
	countExamtypes: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_EXAMTYPES";

		try {
			const examtypesCount = await examtypeService.countExamtypes();
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMTYPES_COUNTED",
				data: examtypesCount,
				message: "Examtypes counted successfully",
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

	// Update Examtype
	updateExamtype: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_EXAMTYPE";
		const examtypeId = req.params.examtypeId;
		const { name } = req.body;

		try {
			const examtype = await examtypeService.updateExamtype({
				examtypeId,
				data: { name },
			});
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMTYPES_UPDATED",
				data: examtype,
				message: "Examtype updated successfully",
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
	 * Delete Examtype
	 */
	deleteExamtypes: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_EXAMTYPE";
		const examtypeId = req.params.examtypeId;
		console.log(examtypeId);

		try {
			const result = await examtypeService.deleteExamtype(examtypeId);
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMTYPE_DELETED",
				data: result,
				message: "Examtype deleted successfully",
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

export = examtypeController;
