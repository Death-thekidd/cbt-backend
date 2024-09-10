import { Level } from "../database/models";
import { Identifier, Op } from "sequelize";

/**
 * Create Level
 * User: Admin
 */

const createLevel = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Level.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Levels
 * User: Admin
 */

const getLevels = async () => {
	try {
		return await Level.findAll({
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Levels
 */
const countLevels = async () => {
	try {
		return await Level.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Level
 *


/***
 * Update  Level
 * 
*/
const updateLevel = async ({
	levelId,
	data,
}: {
	levelId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Level.update(
			{
				name: data.name,
			},
			{
				where: { id: levelId },
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
 * Delete Levels
 */
const deleteLevel = async (data: any) => {
	try {
		return await Level.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export default {
	createLevel,
	getLevels,
	countLevels,
	updateLevel,
	deleteLevel,
};
