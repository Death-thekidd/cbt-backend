import { Request, Response } from "express";
import ExamResultService from "../services/result.service";
import sequelize from "../database/connection";
import createResponder from "../lib/respondAndLog";

/**
 * Submit Exam Result
 */
export const submitExamResult = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res);
	const activity = "SUBMIT_EXAM_RESULT";
	const transaction = await sequelize.transaction();

	try {
		const { examId, studentId, answers, startTime, endTime } = req.body;

		// Validate required fields
		if (!examId || !studentId || !answers || !startTime || !endTime) {
			return respondAndLog({
				activity,
				status: 400,
				code: "MISSING_REQUIRED_FIELDS",
				message: "Missing required fields",
			});
		}

		// Call the service function to submit the exam result
		const result = await ExamResultService.submitExamresult({
			examId,
			studentId,
			answers,
			startTime,
			endTime,
			transaction,
		});
		await transaction.commit();

		respondAndLog({
			activity,
			status: 201,
			code: "EXAM_RESULT_SUBMITTED",
			data: result,
			message: "Exam result submitted successfully",
		});
	} catch (error: any) {
		await transaction.rollback();
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
 * Fetch Exam Result for a Specific Student and Exam
 */
export const getExamResult = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_EXAM_RESULT";
	const { studentId, examId } = req.params;

	try {
		const result = await ExamResultService.fetchExamResult(studentId, examId);
		if (!result) {
			return respondAndLog({
				activity,
				status: 404,
				code: "EXAM_RESULT_NOT_FOUND",
				message: "Exam result not found",
			});
		}
		respondAndLog({
			activity,
			status: 200,
			code: "EXAM_RESULT_FETCHED",
			data: result,
			message: "Exam result fetched successfully",
		});
	} catch (error: any) {
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
 * Fetch All Exam Results for a Specific Exam
 */
export const getAllExamResults = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_ALL_EXAM_RESULTS";
	const { examId } = req.params;

	try {
		const results = await ExamResultService.fetchAllExamResults(examId);
		respondAndLog({
			activity,
			status: 200,
			code: "ALL_EXAM_RESULTS_FETCHED",
			data: results,
			message: "All exam results fetched successfully",
		});
	} catch (error: any) {
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.message,
			message: "Something went wrong, contact support",
		});
	}
};
