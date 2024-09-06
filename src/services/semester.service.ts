import { Semester } from "../database/models";
import { Identifier, Op } from "sequelize";

/**
 * Create Semester
 * User: Admin
 */

const createSemester = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Semester.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Semesters
 * User: Admin
 */

const getSemesters = async () => {
	try {
		return await Semester.findAll({
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Semesters
 */
const countSemesters = async () => {
	try {
		return await Semester.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Semester
 *


/***
 * Update  Semester
 * 
*/
const updateSemester = async ({
	semesterId,
	data,
}: {
	semesterId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Semester.update(
			{
				name: data.name,
			},
			{
				where: { id: semesterId },
			}
		).catch(function (error) {
			console.log("works");
			throw error;
		});
	} catch (error) {
		console.log("works");
	}
};

/**
 * Delete Semesters
 */
const deleteSemester = async (data: any) => {
	try {
		return await Semester.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export {
	createSemester,
	getSemesters,
	countSemesters,
	updateSemester,
	deleteSemester,
};
