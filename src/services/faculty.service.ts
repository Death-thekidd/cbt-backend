import { Identifier, Op } from "sequelize";
import { Faculty } from "../database/models";

/**
 * Create Faculty
 * User: Admin
 */

const createFaculty = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Faculty.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Faculties
 * User: Admin
 */

const getFaculties = async () => {
	try {
		return await Faculty.findAll({
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Faculties
 */
const countFaculties = async () => {
	try {
		return await Faculty.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Faculty
 *


/***
 * Update  Faculty
 * 
*/
const updateFaculty = async ({
	facultyId,
	data,
}: {
	facultyId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Faculty.update(
			{
				name: data.name,
			},
			{
				where: { id: facultyId },
			}
		).catch(function (error: any) {
			console.log("works");
			throw error;
		});
	} catch (error) {
		console.log("works");
	}
};

/**
 * Delete Faculties
 */
const deleteFaculty = async (data: any) => {
	try {
		return await Faculty.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export default {
	createFaculty,
	getFaculties,
	countFaculties,
	updateFaculty,
	deleteFaculty,
};
