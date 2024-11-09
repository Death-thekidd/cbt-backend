import { Identifier, Op, Sequelize, col } from "sequelize";

import {
	Question,
	Level,
	Semester,
	Department,
	Course,
	Option,
} from "../database/models";
import addZero from "add-zero";

/**
 * Create Question
 * User: Admin
 */

const createQuestion = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here

	try {
		const name = await generateQuestionName(data.courseId);
		const { text, type, score, options, courseId } = data;

		// Create the question
		const question = await Question.create({
			text,
			type,
			score,
			courseId,
			name: name,
		});

		// Create the options if provided
		if (options && options.length) {
			const formattedOptions = options.map((option: any) => ({
				...option,
				questionId: question.id,
			}));
			const optionList = await Option.bulkCreate(formattedOptions);
			question.addOptions(optionList);
		}

		return question;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 *
 * Bulk Create
 */
const bulkCreateQuestion = async (data: any, transaction: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	const { courseId, questions: questionList } = data;
	try {
		const questions = [];
		for (let questionData of questionList) {
			const { text, type, score, options } = questionData;
			const name = await generateQuestionName(courseId);
			const question = await Question.create(
				{ text, type, score, courseId, name },
				{ transaction }
			);

			if (options && options.length) {
				const formattedOptions = options.map((option: any) => ({
					...option,
					questionId: question.id,
				}));
				const optionList = await Option.bulkCreate(formattedOptions, {
					transaction,
				});
				question.addOptions(optionList);
			}

			questions.push(question);
		}

		return questions;
	} catch (error) {
		throw error;
	}
};

/**
 * Get all Questions
 * User: Admin
 */
const getQuestions = async () => {
	try {
		const questions = await Question.findAll({
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
					include: [
						{ model: Department, required: false, as: "departments", attributes: [] },
						{ model: Semester, required: false, as: "semesters", attributes: [] },
						{ model: Level, required: false, as: "levels", attributes: [] },
					],
				},
				{
					model: Option,
					required: false,
					as: "options",
					attributes: ["id", "text", "isCorrect"],
					through: { attributes: [] },
				},
			],
			order: [["name", "ASC"]],
		});

		return questions;
	} catch (error) {
		throw error;
	}
};

/**
 * Count Questions
 */
const countQuestions = async () => {
	try {
		return await Question.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Question
 *


/***
 * Update  Question
 * 
*/
const updateQuestion = async ({
	questionId,
	data,
}: {
	questionId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		const question = await Question.findByPk(questionId);

		if (!question) {
			return null;
		}

		const { text, type, score, options } = data;

		question.text = text || question.text;
		question.type = type || question.type;
		question.score = score || question.score;
		await question.save();

		if (options && options.length) {
			await Option.destroy({ where: { questionId: questionId } });
			const newOptions = options.map((option: any) => ({
				...option,
				questionId: questionId,
			}));
			await Option.bulkCreate(newOptions);
		}

		return question;
	} catch (error) {
		throw error;
	}
};

/**
 * Delete Questions
 */
const deleteQuestion = async (data: any) => {
	try {
		return await Question.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

//Get Question By ID
const getQuestionById = async (data: any) => {
	try {
		return await Question.findOne({
			where: { id: data },
			attributes: [
				"id",
				[col("courses.name"), "course"],
				"name",
				"text",
				[col("courses.levels.name"), "level"],
				[col("courses.semesters.name"), "semester"],
				[col("courses.departments.name"), "department"],
			],
			include: [
				{
					model: Course,
					required: false,
					as: "courses",
					attributes: [],
					include: [
						{ model: Department, required: false, as: "departments", attributes: [] },
						{ model: Semester, required: false, as: "semesters", attributes: [] },
						{ model: Level, required: false, as: "levels", attributes: [] },
					],
				},
				{
					model: Option,
					required: false,
					as: "options",
					attributes: [],
				},
				// { model: Session, required: false, as: "sessions", attributes: [] },
				// { model: Level, required: false, as: "levels", attributes:[]},
				//{ model: Semester, required: false, as: "semesters", attributes:[]}
			],
		});
	} catch (error) {
		throw error;
	}
};

const generateQuestionName = async (courseId: any) => {
	const course = await Course.findOne({
		where: { id: courseId },
	});
	const courseCode = course.code.replace(/\s+/g, "");
	const questionNoPrefix = `QS-${courseCode}`;

	const questionGroup = await Question.count({
		where: {
			name: { [Op.like]: `${questionNoPrefix}-%` },
		},
	});

	const serialNo = addZero(questionGroup + 1, 2);

	console.log("result:", questionGroup);

	const questionName = `${questionNoPrefix}-${serialNo}`;

	return questionName;
};

export default {
	createQuestion,
	getQuestions,
	countQuestions,
	updateQuestion,
	deleteQuestion,
	getQuestionById,
	bulkCreateQuestion,
};
