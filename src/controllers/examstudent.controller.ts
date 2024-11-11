import { Request, Response } from "express";
import on from "../lib/on";
import examstudentService from "../services/examstudent.service";
import createResponder from "../lib/respondAndLog";
import examService from "../services/exam.service";

/**
 * Add Examstudent
 * User: Admin
 */
const addStudents = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "ADD_STUDENT";
	const { examId } = req.params;
	const { file } = req.body;

	try {
		const examstudent = await examstudentService.addStudents({
			examId,
			file,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMSTUDENT_ADDED",
			data: examstudent,
			message: "Student(s) added to exam successfully",
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

/**
 * Add Examstudents2
 * User: Admin
 */
const addStudents2 = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "ADD_STUDENTS";
	const { examId } = req.params;
	const { students } = req.body; // Expecting `students` array in request body

	try {
		const result = await examstudentService.addStudents2({
			examId,
			students,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMSTUDENTS_ADDED",
			data: result,
			message: "Students added to exam successfully",
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
 * Get questions added to exam
 */
const getAddedStudents = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_ADDED_STUDENTS";
	const { examId, studentId } = req.params;

	try {
		const examquestions = await examstudentService.getAddedStudents(examId);
		respondAndLog({
			activity,
			status: 200,
			code: "STUDENTS_ADDED_FETCHED",
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
 * Fetch exams for a specific student
 */
const getStudentExams = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH_STUDENT_EXAMS";
	const { studentId } = req.params;

	try {
		const exams = await examService.getStudentExams(studentId);
		respondAndLog({
			activity,
			status: 200,
			code: "STUDENT_EXAMS_FETCHED",
			data: exams,
			message: "Exams fetched successfully for the student",
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
 * Remove Examstudent
 */
const removeStudent = async (req: Request, res: Response): Promise<void> => {
	const respondAndLog = createResponder(req, res);
	const activity = "REMOVE_EXAMSTUDENT";
	const { examId, questionId } = req.params;

	try {
		const result = await examstudentService.removeStudent({
			examId,
			questionId,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "EXAMSTUDENT_REMOVED",
			data: result,
			message: "Student removed from exam successfully",
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
	addStudents,
	getAddedStudents,
	removeStudent,
	addStudents2,
	getStudentExams,
};
