import { Identifier, Op } from "sequelize";

import { Questiontype, Level, Semester, Department } from "../database/models";

/**
 * Create Questiontype
 * User: Admin
 */

const createQuestiontype = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Questiontype.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Questiontypes
 * User: Admin
 */

const getQuestiontypes = async () => {
	try {
		return await Questiontype.findAll({
			attributes: ["id", "name"],
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Questiontypes
 */
const countQuestiontypes = async () => {
	try {
		return await Questiontype.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Questiontype
 *


/***
 * Update  Questiontype
 * 
*/
const updateQuestiontype = async ({
	questiontypeId,
	data,
}: {
	questiontypeId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Questiontype.update(
			{
				name: data.name,
			},
			{
				where: { id: questiontypeId },
			}
		).catch(function (error: any) {
			throw error;
		});
	} catch (error) {}
};

/**
 * Delete Questiontypes
 */
const deleteQuestiontype = async (data: any) => {
	try {
		return await Questiontype.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export {
	createQuestiontype,
	getQuestiontypes,
	countQuestiontypes,
	updateQuestiontype,
	deleteQuestiontype,
};
