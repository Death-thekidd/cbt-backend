import { Examtype, Level, Semester, Department } from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Create Examtype
 * User: Admin
 */

const createExamtype = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here

	try {
		return await Examtype.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Examtypes
 * User: Admin
 */

const getExamtypes = async () => {
	try {
		return await Examtype.findAll({
			attributes: ["id", "name"],
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Examtypes
 */
const countExamtypes = async () => {
	try {
		return await Examtype.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Examtype
 *


/***
 * Update  Examtype
 * 
*/
const updateExamtype = async ({
	examtypeId,
	data,
}: {
	examtypeId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Examtype.update(
			{
				name: data.name,
			},
			{
				where: { id: examtypeId },
			}
		).catch(function (error) {
			throw error;
		});
	} catch (error) {}
};

/**
 * Delete Examtypes
 */
const deleteExamtype = async (data: any) => {
	try {
		return await Examtype.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export {
	createExamtype,
	getExamtypes,
	countExamtypes,
	updateExamtype,
	deleteExamtype,
};
