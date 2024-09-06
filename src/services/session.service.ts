import { Identifier, Op } from "sequelize";

import { Session } from "../database/models";

/**
 * Create Session
 * User: Admin
 */

const createSession = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Session.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Sessions
 * User: Admin
 */

const getSessions = async () => {
	try {
		return await Session.findAll({
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Sessions
 */
const countSessions = async () => {
	try {
		return await Session.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Session
 *


/***
 * Update  Session
 * 
*/
const updateSession = async ({
	sessionId,
	data,
}: {
	sessionId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Session.update(
			{
				name: data.name,
			},
			{
				where: { id: sessionId },
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
 * Delete Sessions
 */
exports.deleteSession = async (data: any) => {
	try {
		return await Session.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export { createSession, getSessions, countSessions, updateSession };
