import { Request, Response } from "express";
import questiontypeService from "../services/questiontype.service";
import createResponder from "../lib/respondAndLog";

const questiontypeController = {
	/**
	 * Create Questiontype
	 * User: Admin
	 */
	createQuestiontype: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_QUESTIONTYPE";
		const data = req.body;

		try {
			const questiontype = await questiontypeService.createQuestiontype({
				...data,
			});
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONTYPE_CREATED",
				data: questiontype,
				message: "Questiontype created successfully",
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
	 * Get Questiontypes
	 */
	getQuestiontypes: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_QUESTIONTYPES";

		try {
			const questiontypes = await questiontypeService.getQuestiontypes();
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONTYPES_FETCHED",
				data: questiontypes,
				message: "Questiontypes fetched successfully",
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
	 * Count Questiontypes
	 */
	countQuestiontypes: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_QUESTIONTYPES";

		try {
			const questiontypesCount = await questiontypeService.countQuestiontypes();
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONTYPES_COUNTED",
				data: questiontypesCount,
				message: "Questiontypes counted successfully",
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

	// Update Questiontype
	updateQuestiontype: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_QUESTIONTYPE";
		const questiontypeId = req.params.questiontypeId;
		const { name } = req.body;

		try {
			const questiontype = await questiontypeService.updateQuestiontype({
				questiontypeId,
				data: { name },
			});
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONTYPE_UPDATED",
				data: questiontype,
				message: "Questiontype updated successfully",
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
	 * Delete Questiontype
	 */
	deleteQuestiontypes: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_QUESTIONTYPE";
		const questiontypeId = req.params.questiontypeId;

		try {
			const result = await questiontypeService.deleteQuestiontype(questiontypeId);
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONTYPE_DELETED",
				data: result,
				message: "Questiontype deleted successfully",
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

export = questiontypeController;
