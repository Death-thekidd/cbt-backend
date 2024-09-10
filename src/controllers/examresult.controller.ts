import { Request, Response } from "express";
import examresultService from "../services/examresult.service";
import createResponder from "../lib/respondAndLog";

const examresultController = {
	/**
	 * Create Examresult
	 * User: Admin
	 */
	createExamresult: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_EXAMRESULT";
		const data = req.body;

		try {
			const examresult = await examresultService.createExamresult({ ...data });
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMRESULT_CREATED",
				data: examresult,
				message: "Examresult created successfully",
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
	 * Get Examresults
	 */
	getExamresults: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_EXAMRESULTS";

		try {
			const examresults = await examresultService.getExamresults();
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMRESULTS_FETCHED",
				data: examresults,
				message: "Examresults fetched successfully",
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
	 * Count Examresults
	 */
	countExamresults: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_EXAMRESULTS";

		try {
			const examresultsCount = await examresultService.countExamresults();
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMRESULTS_COUNTED",
				data: examresultsCount,
				message: "Examresults counted successfully",
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

	// Update Examresult
	updateExamresult: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_EXAMRESULT";
		const examresultId = req.params.examresultId;
		const data = req.body;

		try {
			const examresult = await examresultService.updateExamresult({
				examresultId,
				...data,
			});
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMRESULTS_UPDATED",
				data: examresult,
				message: "Examresult updated successfully",
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
	 * Delete Examresult
	 */
	deleteExamresults: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_EXAMRESULT";
		const examresultId = req.params.examresultId;

		try {
			const result = await examresultService.deleteExamresult(examresultId);
			respondAndLog({
				activity,
				status: 200,
				code: "EXAMRESULT_DELETED",
				data: result,
				message: "Examresult deleted successfully",
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
	 * Get Examresult By ID
	 */
	getExamresultById: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_EXAM_RESULT";
		const examresultId = req.params.examresultId;

		try {
			const examresult = await examresultService.getExamresultById(examresultId);
			respondAndLog({
				activity,
				status: 200,
				code: "EXAM_RESULT_FETCHED",
				data: examresult,
				message: "Examresult fetched successfully",
			});
		} catch (error) {
			console.error(error.message);
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.message,
				message: "Something went wrong, contact support.",
			});
		}
	},
};

export = examresultController;
