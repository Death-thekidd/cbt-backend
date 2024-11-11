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
	User,
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
				[col("course.code"), "course"],
				[col("course.department.name"), "department"],
				[col("course.department.faculty.name"), "faculty"],
				[col("course.level.name"), "level"],
				[col("course.semester.name"), "semester"],
				[col("session.name"), "session"],
			],
			include: [
				{
					model: Course,
					required: false,
					as: "course",
					attributes: [],
					include: [
						{
							model: Level,
							required: false,
							as: "level",
							attributes: [],
						},
						{
							model: Department,
							required: false,
							as: "department",
							attributes: [],
							include: [
								{
									model: Faculty,
									required: false,
									as: "faculty",
									attributes: [],
								},
							],
						},
						{
							model: Semester,
							required: false,
							as: "semester",
							attributes: [],
						},
					],
				},
				{
					model: Session,
					required: false,
					as: "session",
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
				[col("course.code"), "course"],
				[col("course.department.name"), "department"],
				[col("course.department.faculty.name"), "faculty"],
				[col("course.level.name"), "level"],
				[col("course.semester.name"), "semester"],
				[col("session.name"), "session"],
			],
			include: [
				{
					model: Course,
					required: false,
					as: "course",
					attributes: ["id"],
					include: [
						{
							model: Level,
							required: false,
							as: "level",
							attributes: ["id"],
						},
						{
							model: Department,
							required: false,
							as: "department",
							attributes: ["id"],
							include: [
								{
									model: Faculty,
									required: false,
									as: "faculty",
									attributes: ["id"],
								},
							],
						},
						{
							model: Semester,
							required: false,
							as: "semester",
							attributes: ["id"],
						},
					],
				},
				{
					model: Session,
					required: false,
					as: "session",
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

const getStudentExams = async (studentId: any) => {
	try {
		// Find the student by ID and use the getExams association method
		const student = await User.findByPk(studentId);
		if (!student) throw new Error("Student not found");

		// Fetch exams with nested details
		const exams = await student.getExams({
			attributes: [
				"id",
				"name",
				"startDate",
				"endDate",
				"duration",
				[col("course.code"), "course"],
				[col("course.department.name"), "department"],
				[col("course.department.faculty.name"), "faculty"],
				[col("course.level.name"), "level"],
				[col("course.semester.name"), "semester"],
				[col("session.name"), "session"],
			],
			include: [
				{
					model: Course,
					as: "course",
					attributes: [],
					include: [
						{
							model: Level,
							as: "level",
							attributes: [],
						},
						{
							model: Department,
							as: "department",
							attributes: [],
							include: [
								{
									model: Faculty,
									as: "faculty",
									attributes: [],
								},
							],
						},
						{
							model: Semester,
							as: "semester",
							attributes: [],
						},
					],
				},
				{
					model: Session,
					as: "session",
					attributes: [],
				},
				{
					model: Question,
					as: "questions",
					attributes: ["id", "name", "type", "text", "topic", "score"],
					through: { attributes: [] },
					include: [
						{
							model: Option,
							as: "options",
							attributes: ["id", "text", "isCorrect"],
							through: { attributes: [] },
						},
					],
				},
			],
			order: [["name", "DESC"]],
			joinTableAttributes: ["submitted"], // Include the 'submitted' attribute from the join table
		});

		return exams;
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
	getStudentExams,
};
