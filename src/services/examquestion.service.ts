import {
	Examquestion,
	Question,
	Faculty,
	Exam,
	Option,
	Course,
} from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Add question to exam
 * User: Admin
 */
const addQuestion = async (data: any) => {
	const { examId, questionId } = data;
	try {
		const exam = await Exam.findByPk(examId);
		const question = await Question.findByPk(questionId);
		if (!exam || !question) throw new Error("Exam or Question not found");

		await exam.addQuestion(question);
		const updatedQuestions = await exam.getQuestions({
			attributes: [
				"id",
				[col("courses.name"), "courseName"],
				[col("courses.code"), "courseCode"],
				"name",
				"text",
				"type",
				"score",
			],
			include: [
				{
					model: Course,
					required: false,
					as: "courses",
					attributes: [],
				},
				{ model: Option, as: "options", attributes: ["id", "text", "isCorrect"] },
			],
			joinTableAttributes: [],
		});

		return updatedQuestions;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Remove Question from Exam
 */
const removeQuestion = async (data: any) => {
	const { examId, questionId } = data;
	try {
		const exam = await Exam.findByPk(examId);
		const question = await Question.findByPk(questionId);

		if (!exam || !question) throw new Error("Exam or Question not found");

		await exam.removeQuestion(question);
		const updatedQuestions = await exam.getQuestions({
			attributes: [
				"id",
				[col("courses.name"), "courseName"],
				[col("courses.code"), "courseCode"],
				"name",
				"text",
				"type",
				"score",
			],
			include: [
				{
					model: Course,
					required: false,
					as: "courses",
					attributes: [],
				},
				{
					model: Option,
					as: "options",
					attributes: ["id", "text", "isCorrect"],
					through: { attributes: [] },
				},
			],
			joinTableAttributes: [],
		});

		return updatedQuestions;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Fetch Questions that match type/course but not already in exam
 */
const getQuestionsForExam = async (examId: any) => {
	try {
		const exam = await Exam.findByPk(examId);
		if (!exam) throw new Error("Exam not found");

		// const addedQuestions = await Examquestion.findAll({ where: { examId } });
		const addedQuestions = await exam.getQuestions();
		const addedQuestionIds = addedQuestions.map((eq) => eq.id);

		const questions = await Question.findAll({
			where: {
				type: exam.type,
				courseId: exam.courseId,
				id: { [Op.notIn]: addedQuestionIds },
			},
			attributes: [
				"id",
				[col("courses.name"), "courseName"],
				[col("courses.code"), "courseCode"],
				"name",
				"text",
				"type",
				"score",
			],
			include: [
				{
					model: Course,
					required: false,
					as: "courses",
					attributes: [],
				},
				{
					model: Option,
					required: false,
					as: "options",
					attributes: ["id", "text", "isCorrect"],
					through: { attributes: [] },
				},
			],
		});

		return questions;
	} catch (error) {
		throw error;
	}
};

/**
 * Fetch Questions already in Exam
 */
const getAddedQuestions = async (examId: any) => {
	try {
		const exam = await Exam.findByPk(examId);
		if (!exam) throw new Error("Exam not found");

		const addedQuestions = await exam.getQuestions({
			attributes: [
				"id",
				[col("courses.name"), "courseName"],
				[col("courses.code"), "courseCode"],
				"name",
				"text",
				"type",
				"score",
			],
			include: [
				{
					model: Course,
					required: false,
					as: "courses",
					attributes: [],
				},
				{
					model: Option,
					as: "options",
					attributes: ["id", "text", "isCorrect"],
					through: { attributes: [] },
				},
			],
			joinTableAttributes: [],
		});

		return addedQuestions;
	} catch (error) {
		throw error;
	}
};

/**
 * Count Examquestions
 */
const countExamquestions = async () => {
	try {
		return await Examquestion.count({});
	} catch (error) {
		throw error;
	}
};

// Check if Question Exists
const checkQuestionExist = async (questionId: Identifier) => {
	try {
		const count = await Examquestion.count({
			where: { questionId }, // Assuming there's a field named questionId in Examquestion
		});
		return count > 0; // Returns true if exists, false otherwise
	} catch (error) {
		throw error;
	}
};

export default {
	addQuestion,
	removeQuestion,
	getQuestionsForExam,
	getAddedQuestions,
	countExamquestions,
	checkQuestionExist,
};
