import { Examquestion, Question, Faculty } from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Create Examquestion
 * User: Admin
 */

const createExamquestion = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Examquestion.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 *
 * Bulk Create
 */
const bulkCreateExamQuestions = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here

	try {
		console.log(data);
		return await Examquestion.bulkCreate(data, { returning: true });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Examquestions
 * User: Admin
 */

const getExamquestions = async () => {
	try {
		return await Examquestion.findAll({
			attributes: ["id", "name", [col("faculties.name"), "faculty"]],
			include: [
				{ model: Faculty, required: true, as: "faculties", attributes: [] },
			],
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Examquestions
 */
const countExamquestions = async () => {
	try {
		return await Examquestion.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Examquestion
 *


/***
 * Update  Examquestion
 * 
*/
const updateExamquestion = async ({
	examresultId,
	data,
}: {
	examresultId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Examquestion.update(data, {
			where: { id: examresultId },
		}).catch(function (error) {
			throw error;
		});
	} catch (error) {}
};

/**
 * Delete Examquestions
 */
const deleteExamquestion = async (data: any) => {
	try {
		return await Examquestion.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

//Get Question By ID
const getQuestionById = async (data: any) => {
	try {
		console.log(data);
		return await Question.findOne({
			where: { id: { [Op.eq]: data } },
		});
	} catch (error) {
		throw error;
	}
};

const checkQuestionExist = async () => {
	try {
		const exist = await Examquestion.count({});
		if (exist > 0) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
	}
};

export {
	createExamquestion,
	getExamquestions,
	countExamquestions,
	updateExamquestion,
	deleteExamquestion,
	bulkCreateExamQuestions,
	getQuestionById,
	checkQuestionExist,
};
