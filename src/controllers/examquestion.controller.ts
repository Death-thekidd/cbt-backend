import { Request, Response } from "express";
import on from "../lib/on";
import examquestionService from "../services/examquestion.service";
import createResponder from "../lib/respondAndLog";

/**
 * Create Examquestion
 * User: Admin
 */
const createExamquestion = async (
	req: Request,
	res: Response
): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "CREATE_QUESTION";
	const data = req.body;
	const question = req.body.questionId;

	try {
		const questionExists = await examquestionService.checkQuestionExist(question);
		if (questionExists) {
			return respondAndLog({
				activity,
				status: 403,
				code: "QUESTION_EXISTS",
				message: "Question already added",
			});
		}

		const examquestion = await examquestionService.createExamquestion({
			...data,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMQUESTION_CREATED",
			data: examquestion,
			message: "Examquestion created successfully",
		});
	} catch (error) {
		console.log(error);
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.message,
			message: "Something went wrong, contact support",
		});
	}
};

const bulkCreateExamQuestions = async (
	req: Request,
	res: Response
): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "CREATE_BULK_EXAM_QUESTIONS";
	const data = req.body;

	try {
		const questions = await examquestionService.bulkCreateExamQuestions(data);
		respondAndLog({
			activity,
			status: 200,
			code: "EXAM_QUESTIONS_CREATED",
			data: questions,
			message: "Exam questions created successfully",
		});
	} catch (error) {
		console.log(error);
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.stack,
			message: "Something went wrong, contact support",
		});
	}
};

/***
 * Get Examquestions
 */
const getExamquestions = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_ALL_EXAMQUESTIONS";

	try {
		const examquestions = await examquestionService.getExamquestions();
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMQUESTIONS_FETCHED",
			data: examquestions,
			message: "Examquestions fetched successfully",
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
};

/**
 * Count Examquestions
 */
const countExamquestions = async (
	req: Request,
	res: Response
): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "COUNT_ALL_EXAMQUESTIONS";

	try {
		const examquestions = await examquestionService.countExamquestions();
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMQUESTIONS_COUNTED",
			data: examquestions,
			message: "Examquestions counted successfully",
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
};

// Update Examquestion
const updateExamquestion = async (
	req: Request,
	res: Response
): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "UPDATE_EXAMQUESTION";
	const examquestionId = req.params.examquestionId;
	const name = req.body.name;

	try {
		const examquestion = await examquestionService.updateExamquestion({
			examquestionId,
			data: { name },
		});
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMQUESTIONS_UPDATED",
			data: examquestion,
			message: "Examquestion updated successfully",
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
};

/**
 * Delete Examquestion
 */
const deleteExamquestions = async (
	req: Request,
	res: Response
): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "DELETE_EXAMQUESTION";
	const examquestionId = req.params.examquestionId;

	try {
		const result = await examquestionService.deleteExamquestion(examquestionId);
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMQUESTION_DELETED",
			data: result,
			message: "Examquestion deleted successfully",
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
};

// Export all functions as a default object
export {
	createExamquestion,
	bulkCreateExamQuestions,
	getExamquestions,
	countExamquestions,
	updateExamquestion,
	deleteExamquestions,
};
