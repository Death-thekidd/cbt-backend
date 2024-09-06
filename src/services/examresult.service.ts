import {
	Examresult,
	User,
	Course,
	Exam,
	Faculty,
	Department,
	Semester,
	Session,
	Level,
} from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Create Examresult
 * User: Admin
 */

const createExamresult = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Examresult.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Examresults
 * User: Admin
 */

const getExamresults = async () => {
	try {
		return await Examresult.findAll({
			attributes: ["id", "answers", "questions", "startTime", "endTime"],
			include: [
				{
					model: Exam,
					required: true,
					as: "exams",
					include: [
						{
							model: Course,
							required: true,
							as: "courses",
							include: [
								{ model: Department, required: true, as: "departments" },
								{ model: Level, required: true, as: "levels" },
								{ model: Semester, required: true, as: "semesters" },
							],
						},
						{ model: Session, required: true, as: "sessions" },
					],
				},
				{ model: User, required: true, as: "users" },
			],
			order: [["startTime", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Examresults
 */
const countExamresults = async () => {
	try {
		return await Examresult.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Examresult
 *


/***
 * Update  Examresult
 * 
*/
const updateExamresult = async ({
	examresultId,
	data,
}: {
	examresultId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Examresult.update(data, {
			where: { id: examresultId },
		}).catch(function (error) {
			throw error;
		});
	} catch (error) {}
};

/**
 * Delete Examresults
 */
const deleteExamresult = async (data: any) => {
	try {
		return await Examresult.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

//Get Examresult By ID
const getExamresultById = async (data: any) => {
	try {
		let result = await Examresult.findOne({
			attributes: [
				"id",
				[col("exams.courses.levels.name"), "level"],
				[col("exams.courses.semesters.name"), "semester"],
				[col("exams.courses.departments.name"), "department"],
				[col("exams.courses.departments.faculties.name"), "faculty"],
				[col("exams.sessions.name"), "session"],
				"startTime",
				"endTime",
				"answers",
				"questions",
			],
			include: [
				{
					model: Exam,
					required: true,
					as: "exams",
					include: [
						{
							model: Course,
							required: true,
							as: "courses",
							include: [
								{
									model: Department,
									required: true,
									as: "departments",
									include: [
										{ model: Faculty, required: false, as: "faculties", attributes: [] },
									],
								},
								{ model: Level, required: true, as: "levels" },
								{ model: Semester, required: false, as: "semesters", attributes: [] },
							],
						},
						{ model: Session, required: false, as: "sessions", attributes: [] },
					],
				},
				{ model: User, required: true, as: "users" },
			],
			where: { id: { [Op.eq]: data } },
		});

		let correct = 0;
		let wrong = 0;
		let unanswered = 0;
		await result.questions.forEach((element, index) => {
			for (let i = 0; i < element.answer.length; i++) {
				if (result.answers[index].answer[i] == 0) unanswered++;
				else if (element.answer[i] == result.answers[index].answer[i]) correct++;
				else if (element.answer[i] != result.answers[index].answer[i]) wrong++;
			}
			/* console.log(
                element.id, 
                element.questionText, 
                element.answer,
                result.answers[index].answer,
                
                "=> index:", 
            
            index)*/
		});
		const grading = {
			total: correct + wrong + unanswered,
			correct: correct,
			wrong: wrong,
			unanswered: unanswered,
			score: correct - wrong / 2,
		};
		//console.log(grading)
		// result.dataValues.grade = grading;
		//console.log(correct, wrong, unanswerd)
		//console.log("working")
		return { ...result, dataValues: { ...result.dataValues, grade: grading } };
	} catch (error) {
		throw error;
	}
};

export {
	getExamresults,
	createExamresult,
	countExamresults,
	updateExamresult,
	deleteExamresult,
	getExamresultById,
};
