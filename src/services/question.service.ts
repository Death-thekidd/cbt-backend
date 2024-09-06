import { Identifier, Op, col } from "sequelize";

import {
	Question,
	Level,
	Semester,
	Session,
	Department,
	Course,
	Questiontype,
} from "../database/models";
import addZero from "add-zero";

/**
 * Create Question
 * User: Admin
 */

const createQuestion = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here

	try {
		let course = await Course.findOne({
			where: { id: data.courseId },
		});
		let courseCode = course.code.replace(/\s+/g, "");
		const questionNoPrefix = `QS-${courseCode}`;
		const questionGroup = await Question.count({
			where: {
				name: { [Op.iLike]: `${questionNoPrefix}-%` },
			},
		});

		let serialNo = await addZero(questionGroup + 1, 2);

		console.log("result:", questionGroup);

		const questionName = await `${questionNoPrefix}-${serialNo}`;

		return await Question.create({
			...data,
			name: questionName,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 *
 * Bulk Create
 */
const bulkCreateQuestion = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here

	try {
		console.log(data);
		return await Question.bulkCreate(data, { returning: true });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Questions
 * User: Admin
 */

const getQuestions = async () => {
	try {
		return await Question.findAll({
			attributes: [
				"id",
				[col("courses.name"), "course"],
				[col("questiontypes.name"), "questiontype"],
				"name",
				"questionText",
				"options",
				"answer",
				[col("courses.levels.name"), "level"],
				[col("courses.semesters.name"), "semester"],
				[col("courses.departments.name"), "department"],
				[col("sessions.name"), "session"],
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
					model: Questiontype,
					required: false,
					as: "questiontypes",
					attributes: [],
				},
				{ model: Session, required: false, as: "sessions", attributes: [] },
				// { model: Level, required: false, as: "levels", attributes:[]},
				//{ model: Semester, required: false, as: "semesters", attributes:[]}
			],
			order: [["name", "DESC"]],
		});
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
		return await Question.update(
			{
				name: data.name,
			},
			{
				where: { id: questionId },
			}
		).catch(function (error: any) {
			throw error;
		});
	} catch (error) {}
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
		});
	} catch (error) {
		throw error;
	}
};

export {
	createQuestion,
	getQuestions,
	countQuestions,
	updateQuestion,
	deleteQuestion,
	getQuestionById,
	bulkCreateQuestion,
};
