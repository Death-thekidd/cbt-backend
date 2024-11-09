import { Request, Response } from "express";
import ExamResultService from "../services/result.service";
import sequelize from "../database/connection";

// Submit Exam Result
export const submitExamResult = async (req: Request, res: Response) => {
	const transaction = await sequelize.transaction();
	try {
		const { examId, studentId, answers, startTime, endTime } = req.body;

		// Validate required fields
		if (!examId || !studentId || !answers || !startTime || !endTime) {
			return res.status(400).json({ error: "Missing required fields" });
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

		return res
			.status(201)
			.json({ message: "Exam result submitted successfully", result });
	} catch (error: any) {
		await transaction.rollback();
		return res.status(500).json({ error: error.message });
	}
};

// Fetch Exam Result for a Specific Student and Exam
export const getExamResult = async (req: Request, res: Response) => {
	const { studentId, examId } = req.params;
	try {
		const result = await ExamResultService.fetchExamResult(studentId, examId);
		if (!result) {
			return res.status(404).json({ error: "Exam result not found" });
		}
		return res.status(200).json(result);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

// Fetch All Exam Results for a Specific Exam
export const getAllExamResults = async (req: Request, res: Response) => {
	const { examId } = req.params;
	try {
		const results = await ExamResultService.fetchAllExamResults(examId);
		return res.status(200).json(results);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};
