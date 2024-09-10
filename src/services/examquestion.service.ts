import { Examquestion, Question, Faculty } from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Create Examquestion
 * User: Admin
 */
const createExamquestion = async (data: any) => {
	try {
		return await Examquestion.create({ ...data });
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Bulk Create
 */
const bulkCreateExamQuestions = async (data: any) => {
	try {
		console.log(data);
		return await Examquestion.bulkCreate(data, { returning: true });
	} catch (error) {
		console.error(error);
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
 * Update Examquestion
 */
const updateExamquestion = async ({
	examquestionId,
	data,
}: {
	examquestionId: Identifier;
	data: any;
}) => {
	try {
		return await Examquestion.update(data, {
			where: { id: examquestionId },
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Delete Examquestion
 */
const deleteExamquestion = async (examquestionId: Identifier) => {
	try {
		return await Examquestion.destroy({
			where: {
				id: examquestionId,
			},
		});
	} catch (error) {
		throw error;
	}
};

// Get Question By ID
const getQuestionById = async (questionId: Identifier) => {
	try {
		return await Question.findOne({
			where: { id: { [Op.eq]: questionId } },
		});
	} catch (error) {
		throw error;
	}
};

// Check if Question Exists
const checkQuestionExist = async (questionId: Identifier) => {
	try {
		const count = await Examquestion.count({
			where: { questionId }, // Assuming there's a field named questionId in Examquestion
		});
		return count > 0; // Returns true if exists, false otherwise
	} catch (error) {
		throw error;
	}
};

export default {
	createExamquestion,
	getExamquestions,
	countExamquestions,
	updateExamquestion,
	deleteExamquestion,
	bulkCreateExamQuestions,
	getQuestionById,
	checkQuestionExist,
};
