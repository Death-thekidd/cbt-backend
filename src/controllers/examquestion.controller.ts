import { Request, Response } from "express";
import on from "../lib/on";
import examquestionService from "../services/examquestion.service";
import createResponder from "../lib/respondAndLog";

/**
 * Add Examquestion
 * User: Admin
 */
const addQuestion = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "ADD_QUESTION";
	const { examId } = req.params;
	const { questionIds } = req.body;

	try {
		for (let questionId of questionIds) {
			const questionExists = await examquestionService.checkQuestionExist(
				questionId
			);
			if (questionExists) {
				return respondAndLog({
					activity,
					status: 403,
					code: "QUESTION_EXISTS",
					message: "Question already added",
				});
			}
		}

		const examquestion = await examquestionService.addQuestion({
			examId,
			questionIds,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMQUESTION_ADDED",
			data: examquestion,
			message: "Examquestion added successfully",
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

/***
 * Get questions for exam
 */
const getQuestionsForExam = async (
	req: Request,
	res: Response
): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_QUESTIONS_FOR_EXAM";
	const { examId } = req.params;

	try {
		const examquestions = await examquestionService.getQuestionsForExam(examId);
		respondAndLog({
			activity,
			status: 200,
			code: "QUESTIONS_FOR_EXAM_FETCHED",
			data: examquestions,
			message: "Questions for exam fetched successfully",
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

/***
 * Get questions added to exam
 */
const getAddedQuestions = async (
	req: Request,
	res: Response
): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_ADDED_QUESTIONS";
	const { examId } = req.params;

	try {
		const examquestions = await examquestionService.getAddedQuestions(examId);
		respondAndLog({
			activity,
			status: 200,
			code: "QUESTIONS_ADDED_FETCHED",
			data: examquestions,
			message: "Questions added fetched successfully",
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

/**
 * Remove Examquestion
 */
const removeQuestion = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "REMOVE_EXAMQUESTION";
	const { examId, questionId } = req.params;

	try {
		const result = await examquestionService.removeQuestion({
			examId,
			questionId,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMQUESTION_REMOVED",
			data: result,
			message: "Examquestion removed successfully",
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
	addQuestion,
	removeQuestion,
	getQuestionsForExam,
	getAddedQuestions,
	countExamquestions,
};
