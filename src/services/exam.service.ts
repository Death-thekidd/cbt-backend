import {
	Exam,
	Faculty,
	Course,
	Session,
	Level,
	Semester,
	Department,
	Question,
	Option,
} from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Create Exam
 * User: Admin
 */

const createExam = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Exam.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Exams
 * User: Admin
 */

const getExams = async () => {
	try {
		return await Exam.findAll({
			attributes: [
				"id",
				"name",
				"startDate",
				"endDate",
				"duration",
				[col("courses.code"), "course"],
				[col("courses.departments.name"), "department"],
				[col("courses.departments.faculties.name"), "faculty"],
				[col("courses.levels.name"), "level"],
				[col("courses.semesters.name"), "semester"],
				[col("sessions.name"), "session"],
			],
			include: [
				{
					model: Course,
					required: false,
					as: "courses",
					attributes: [],
					include: [
						{
							model: Level,
							required: false,
							as: "levels",
							attributes: [],
						},
						{
							model: Department,
							required: false,
							as: "departments",
							attributes: [],
							include: [
								{
									model: Faculty,
									required: false,
									as: "faculties",
									attributes: [],
								},
							],
						},
						{
							model: Semester,
							required: false,
							as: "semesters",
							attributes: [],
						},
					],
				},
				{
					model: Session,
					required: false,
					as: "sessions",
					attributes: [],
				},
				{
					model: Question,
					required: false,
					as: "questions",
					attributes: ["id", "name", "type", "text", "topic", "score"],
					include: [
						{
							model: Option,
							required: false,
							as: "options",
							attributes: ["text", "isCorrect"],
							through: { attributes: [] },
						},
					],
				},
			],
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/*Get Exam By ID**/
const getExamById = async (data: any) => {
	try {
		return await Exam.findOne({
			attributes: [
				"id",
				"name",
				"startDate",
				"endDate",
				"duration",
				"examtypeId",
				[col("courses.code"), "course"],
				[col("courses.departments.name"), "department"],
				[col("courses.departments.faculties.name"), "faculty"],
				[col("courses.levels.name"), "level"],
				[col("courses.semesters.name"), "semester"],
				[col("sessions.name"), "session"],
			],
			include: [
				{
					model: Course,
					required: false,
					as: "courses",
					attributes: ["id"],
					include: [
						{
							model: Level,
							required: false,
							as: "levels",
							attributes: ["id"],
						},
						{
							model: Department,
							required: false,
							as: "departments",
							attributes: ["id"],
							include: [
								{
									model: Faculty,
									required: false,
									as: "faculties",
									attributes: ["id"],
								},
							],
						},
						{
							model: Semester,
							required: false,
							as: "semesters",
							attributes: ["id"],
						},
					],
				},
				{
					model: Session,
					required: false,
					as: "sessions",
					attributes: ["id"],
				},
				{
					model: Question,
					required: false,
					as: "questions",
					attributes: [],
					include: [
						{
							model: Option,
							required: false,
							as: "options",
							attributes: [],
						},
					],
				},
			],
			where: { id: { [Op.eq]: data } },
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Exams
 */
const countExams = async () => {
	try {
		return await Exam.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Exam
 *


/***
 * Update  Exam
 * 
*/
const updateExam = async ({
	examId,
	data,
}: {
	examId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		const exam = await Exam.findByPk(examId);
		if (!exam) throw new Error("Exam not found");
		await exam.update(data);
		return exam;
	} catch (error) {
		throw error;
	}
};

/**
 * Delete Exams
 */
const deleteExam = async (data: any) => {
	try {
		const exam = await Exam.findByPk(data);
		if (!exam) throw new Error("Exam not found");
		await exam.destroy();
	} catch (error) {
		throw error;
	}
};

export default {
	createExam,
	getExams,
	getExamById,
	countExams,
	updateExam,
	deleteExam,
};
