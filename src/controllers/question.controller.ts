import { Request, Response } from "express";
import questionService from "../services/question.service";
import createResponder from "../lib/respondAndLog";

const questionController = {
	/**
	 * Create Question
	 * User: Admin
	 */
	createQuestion: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_QUESTION";
		const data = req.body;

		try {
			const question = await questionService.createQuestion({ ...data });
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTION_CREATED",
				data: question,
				message: "Question created successfully",
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

	bulkCreateQuestion: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_BULK_QUESTIONS";
		const data = req.body;

		try {
			const questions = await questionService.bulkCreateQuestion(data);
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONS_CREATED",
				data: questions,
				message: "Questions created successfully",
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
	 * Get Questions
	 */
	getQuestions: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_QUESTIONS";

		try {
			const questions = await questionService.getQuestions();
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONS_FETCHED",
				data: questions,
				message: "Questions fetched successfully",
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
	 * Count Questions
	 */
	countQuestions: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "COUNT_ALL_QUESTIONS";

		try {
			const questionsCount = await questionService.countQuestions();
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTIONS_COUNTED",
				data: questionsCount,
				message: "Questions counted successfully",
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

	// Update Question
	updateQuestion: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_QUESTION";
		const questionId = req.params.questionId;
		const { name } = req.body;

		try {
			const question = await questionService.updateQuestion({
				questionId,
				data: { name },
			});
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTION_UPDATED",
				data: question,
				message: "Question updated successfully",
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
	 * Delete Question
	 */
	deleteQuestions: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_QUESTION";
		const questionId = req.params.questionId;

		try {
			const result = await questionService.deleteQuestion(questionId);
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTION_DELETED",
				data: result,
				message: "Question deleted successfully",
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

	getQuestionById: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_QUESTION";
		const questionId = req.params.questionId;

		try {
			const question = await questionService.getQuestionById(questionId);
			respondAndLog({
				activity,
				status: 200,
				code: "QUESTION_FETCHED",
				data: question,
				message: "Question fetched successfully",
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

export = questionController;
