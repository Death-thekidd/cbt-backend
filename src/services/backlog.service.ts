import { Backlog, User } from "../database/models";
import { Identifier, Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";

/**
 * Get all backlog
 */
const getbacklogs = async () => {
	try {
		return await Backlog.findAll({
			include: [
				{
					model: User,
					required: false,
					as: "users",
				},
			],
			order: [["createdAt", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Create backlog for machine creation
 */
const createBacklog = async (data: any) => {
	try {
		const id = uuidv4();
		return await Backlog.create({ ...data });
	} catch (error) {
		throw error;
	}
};

const getBacklogDetailById = async (id: any) => {
	try {
		return await Backlog.findOne({
			where: {
				id: { [Op.eq]: id },
			},
			include: [
				{
					model: User,
					required: true,
					// include: [{ model: Manpower, required: true }],
				},
			],
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getBacklogByUserId = async (id: Identifier) => {
	try {
		return await Backlog.findAll({
			where: {
				operatorId: { [Op.eq]: id },
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export default {
	getbacklogs,
	createBacklog,
	getBacklogDetailById,
	getBacklogByUserId,
};
