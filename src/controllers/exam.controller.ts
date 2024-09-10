import { Request, Response } from "express";
import on from "../lib/on";
import examService from "../services/exam.service";
import createResponder from "../lib/respondAndLog";

interface ExamData {
	name: string;
	// Add other properties as needed
}

/**
 * Create Exam
 * User: Admin
 */
const createExam = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "CREATE_EXAM";
	const data: ExamData = req.body;

	try {
		const exam = await examService.createExam({ ...data });
		respondAndLog({
			activity,
			status: 200,
			code: "EXAM_CREATED",
			data: exam,
			message: "Exam created successfully",
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
};

/**
 * Get Exams
 */
const getExams = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_ALL_EXAMS";

	try {
		const exams = await examService.getExams();
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMS_FETCHED",
			data: exams,
			message: "Exams fetched successfully",
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
 * Count Exams
 */
const countExams = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "COUNT_ALL_EXAMS";

	try {
		const exams = await examService.countExams();
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMS_COUNTED",
			data: exams,
			message: "Exams counted successfully",
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

// Update Exam
const updateExam = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "UPDATE_EXAM";
	const examId: string = req.params.examId;
	const data: ExamData = req.body;

	try {
		const exam = await examService.updateExam({ examId, data });
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMS_UPDATED",
			data: exam,
			message: "Exam updated successfully",
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
 * Delete Exam
 */
const deleteExams = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "DELETE_EXAM";
	const examId: string = req.params.examId;

	try {
		const result = await examService.deleteExam(examId);
		respondAndLog({
			activity,
			status: 200,
			code: "EXAM_DELETED",
			data: result,
			message: "Exam deleted successfully",
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

/*** Get Exam By ID */
const getExamById = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_EXAM";
	const examId: string = req.params.examId;

	try {
		const exam = await examService.getExamById(examId);
		respondAndLog({
			activity,
			status: 200,
			code: "EXAM_FETCHED",
			data: exam,
			message: "Exam fetched successfully",
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
};

export {
	createExam,
	getExams,
	countExams,
	updateExam,
	deleteExams,
	getExamById,
};
