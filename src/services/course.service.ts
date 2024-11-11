import {
	Course,
	Level,
	Semester,
	Department,
	Faculty,
} from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Create Course
 * User: Admin
 */

const createCourse = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Course.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Courses
 * User: Admin
 */

const getCourses = async () => {
	try {
		return await Course.findAll({
			attributes: [
				"id",
				"name",
				"code",
				[col("department.name"), "department"],
				[col("department.faculty.name"), "faculty"],
				[col("level.name"), "level"],
				[col("semester.name"), "semester"],
			],
			include: [
				{
					model: Department,
					required: false,
					as: "department",
					attributes: [],
					include: [
						{ model: Faculty, required: false, as: "faculty", attributes: [] },
					],
				},
				{ model: Level, required: false, as: "level", attributes: [] },
				{ model: Semester, required: false, as: "semester", attributes: [] },
			],
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/*Get Course By ID*/
const getCourseById = async (data: any) => {
	try {
		return await Course.findOne({
			attributes: [
				"id",
				"name",
				"code",
				[col("department.id"), "department"],
				[col("department.faculty.name"), "faculty"],
				[col("level.id"), "level"],
				[col("semester.id"), "semester"],
			],
			include: [
				{
					model: Department,
					required: false,
					as: "department",
					attributes: [],
					include: [
						{ model: Faculty, required: false, as: "faculty", attributes: [] },
					],
				},
				{ model: Level, required: false, as: "level", attributes: [] },
				{ model: Semester, required: false, as: "semester", attributes: [] },
			],
			where: { id: { [Op.eq]: data } },
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Courses
 */
const countCourses = async () => {
	try {
		return await Course.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Course
 *


/***
 * Update  Course
 * 
*/
const updateCourse = async ({
	courseId,
	data,
}: {
	courseId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Course.update(
			{
				...data,
			},
			{
				where: { id: courseId },
			}
		).catch(function (error) {
			throw error;
		});
	} catch (error) {}
};

/**
 * Delete Courses
 */
const deleteCourse = async (data: any) => {
	try {
		return await Course.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export default {
	createCourse,
	getCourses,
	getCourseById,
	countCourses,
	updateCourse,
	deleteCourse,
};
