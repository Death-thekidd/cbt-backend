import { listenerCount } from "process";
import {
	User,
	Course,
	Exam,
	Faculty,
	Department,
	Semester,
	Session,
	Level,
	Question,
	Option,
	Answer,
	Result,
	Examstudent,
} from "../database/models";
import { Identifier, Op, col } from "sequelize";

interface ExtendedResult extends Result {
	examName?: string;
	examType?: string;
	examStartDate?: Date;
	examEndDate?: Date;
	examDuration?: number;
	examInstruction?: string;
	sessionName?: string;
	courseName?: string;
	courseCode?: string;
	studentName?: string;
	studentEmail?: string;
	studentMatricNo?: string;
	totalScore: number;
	startTime: Date;
	endTime: Date;

	exam?: {
		name?: string;
		type?: string;
		duration?: number;
		instruction?: string;
		startDate?: Date;
		endDate?: Date;

		session?: {
			name?: string;
		};
		course?: {
			name?: string;
			code?: string;
		};

		questions?: Array<{
			text?: string;
			type?: "MCQ" | "Medical"; // Define more types if necessary
			score?: number;

			answers?: Array<{
				isCorrect?: boolean;
				score?: number;
				studentTrueOrFalse?: boolean;

				options?: Array<{
					text?: string;
					isCorrect?: boolean;
				}>;
			}>;
		}>;
	};

	student?: {
		name?: string;
		email?: string;
		idNumber?: string;
	};
}

/**
 * Submit Exam result
 */
const submitExamresult = async (data: any) => {
	const { examId, studentId, answers, startTime, endTime, transaction } = data;
	try {
		// Fetch the exam with related questions and options
		const exam = await Exam.findOne({
			where: { id: examId },
			include: [
				{
					model: Question,
					as: "questions",
					include: [
						{
							model: Option,
							as: "options",
						},
					],
				},
			],
		});
		if (!exam) throw new Error("Exam not found");

		let totalScore = 0;

		// Loop through each answer submitted by the student
		for (const answer of answers) {
			const { questionId, selectedOptions } = answer;
			const questions = await exam.getQuestions();
			const question = questions.find((q) => q.id === questionId);
			const options = await question.getOptions();
			if (!question) throw new Error(`Invalid question ID: ${questionId}`);

			let questionScore = 0;
			const optionScore = question.score / options.length; // Evenly distributed question score

			if (question.type === "MCQ") {
				const selectedOption = selectedOptions[0];

				// Check if the student selected an option
				if (!selectedOption) {
					questionScore = 0; // No score if no option selected
				} else {
					const correctOption = options.find((o) => o.isCorrect);
					const isCorrect = correctOption?.id === selectedOption.optionId;

					// Full score or zero based on correctness
					questionScore = isCorrect ? question.score : 0;

					// Save the answer via Option's addAnswer method
					const answerCreated = await Answer.create(
						{
							examId,
							studentId,
							questionId,
							optionId: selectedOption.optionId,
							isCorrect,
							studentTrueOrFalse: selectedOption.trueOrFalse,
							score: questionScore,
						},
						{ transaction }
					);
					await question?.addAnswer(answerCreated, { transaction });
				}
			} else if (question.type === "Medical") {
				for (const selectedOption of selectedOptions) {
					const options = await question.getOptions();
					const option = options.find((o) => o.id === selectedOption.optionId);
					if (!option) continue;

					const isCorrect = option.isCorrect === selectedOption.trueOrFalse;
					const optionResultScore = isCorrect
						? optionScore
						: selectedOption.trueOrFalse !== null
						? -optionScore
						: 0;

					questionScore += optionResultScore;

					// Save the answer for each option in Medical questions
					const answerCreated = await Answer.create(
						{
							examId,
							studentId,
							questionId,
							optionId: option.id,
							studentTrueOrFalse: selectedOption.trueOrFalse,
							isCorrect,
							score: optionResultScore,
						},
						{ transaction }
					);
					await question.addAnswer(answerCreated, { transaction });
				}
			}

			// Add question score to total
			totalScore += questionScore;
		}

		// Save the result for the student
		const result = await Result.create(
			{
				totalScore,
				startTime,
				endTime,
				examId,
				studentId,
			},
			{ transaction }
		);

		// Update ExamStudent to mark exam as submitted for the student
		await Examstudent.update(
			{ submitted: true },
			{
				where: {
					examId,
					studentId,
				},
				transaction,
			}
		);

		return result;
	} catch (error) {
		throw error;
	}
};

const fetchExamResult = async (studentId: any, examId: any) => {
	console.log(`\nFetching Exam Result for Student...\n`);
	try {
		const result: any = await Result.findOne({
			where: { studentId, examId },
			attributes: ["totalScore", "startTime", "endTime"],
			include: [
				{
					model: Exam,
					as: "exam",
					required: false,
					attributes: [
						"id",
						"name",
						"type",
						"startDate",
						"endDate",
						"duration",
						"instruction",
					],
					include: [
						{
							model: Course,
							as: "course",
							required: false,
							attributes: ["name", "code"],
						},
						{
							model: Session,
							as: "session",
							required: false,
							attributes: ["name"],
						},
						{
							model: Question,
							as: "questions",
							required: false,
							through: { attributes: [] },
							attributes: ["text", "type", "score"],
							include: [
								{
									model: Answer,
									as: "answers",
									required: false,
									through: { attributes: [] },
									attributes: ["isCorrect", "score", "studentTrueOrFalse"],
									where: { studentId },
									include: [
										{
											model: Option,
											as: "option",
											required: false,
											attributes: ["text", "isCorrect"],
										},
									],
								},
							],
						},
					],
				},
				{
					model: User,
					as: "student",
					required: false,
					attributes: ["firstName", "lastName", "email", "idNumber"],
				},
			],
		});

		console.log(result);

		if (!result) {
			throw new Error("Exam result not found.");
		}

		const formattedQuestions = result.exam.questions.map((question: any) => {
			const formattedOptions = question.answers.map((answer: any) => ({
				optionText: answer.option ? answer.option.text : null,
				isCorrect: question.type === "MCQ" ? answer.option?.isCorrect : undefined,
				studentTrueOrFalse:
					question.type === "Medical" ? answer.studentTrueOrFalse : undefined,
				correctAnswer:
					question.type === "Medical" ? answer.option?.isCorrect : undefined,
				score: question.type === "Medical" ? answer.score : undefined,
			}));

			return {
				questionText: question.text,
				type: question.type,
				score: question.score,
				options: formattedOptions,
			};
		});

		return {
			examDetails: {
				name: result.exam.name,
				type: result.exam.type,
				duration: result.exam.duration,
				instruction: result.exam.instruction,
				course: {
					name: result.exam.course ? result.exam.course.name : null,
					code: result.exam.course ? result.exam.course.code : null,
				},
				session: result.exam.session ? result.exam.session.name : null,
				timing: {
					start: result.startTime,
					end: result.endTime,
					startDate: result.exam.startDate,
					endDate: result.exam.endDate,
				},
			},
			studentDetails: {
				name: result.student
					? `${result.student.firstName} ${result.student.lastName}`
					: null,
				email: result.student ? result.student.email : null,
				matricNo: result.student ? result.student.idNumber : null,
			},
			totalScore: result.totalScore,
			questions: formattedQuestions,
		};
	} catch (error) {
		throw new Error(`Error fetching exam result: ${error.message}`);
	}
};

/**
 * Fetch all exam results for a given examId, including questions, answers, and options
 *
 */
const fetchAllExamResults = async (examId: string) => {
	console.log(`\nFetching all exam results for exam ID: ${examId}\n`);
	try {
		// Fetch all results for the given exam
		const results = await Result.findAll({
			where: { examId },
			attributes: ["totalScore", "startTime", "endTime", "studentId"],
			include: [
				{
					model: Exam,
					as: "exam",
					required: true,
					attributes: [
						"name",
						"type",
						"startDate",
						"endDate",
						"duration",
						"instruction",
					],
					include: [
						{
							model: Session,
							as: "session",
							attributes: ["name"],
						},
						{
							model: Course,
							as: "course",
							attributes: ["name", "code"],
						},
						{
							model: Question,
							as: "questions",
							attributes: ["id", "text", "type", "score"],
							include: [
								{
									model: Answer,
									as: "answers",
									where: {
										studentId: col("studentId"),
									},
									attributes: ["isCorrect", "score", "studentTrueOrFalse"],
									include: [
										{
											model: Option,
											as: "option",
											attributes: ["text", "isCorrect"],
										},
									],
								},
							],
						},
					],
				},
				{
					model: User,
					as: "student",
					attributes: ["firstName", "lastName", "email", "idNumber"],
				},
			],
			raw: false,
		});

		if (!results || results.length === 0) {
			throw new Error("No exam results found.");
		}

		// Structure the results similarly to `fetchExamResult`
		const formattedResults = results.map((result: any) => {
			const formattedQuestions = result.exam.questions.map((question: any) => {
				const formattedOptions = question.answers.map((answer: any) => ({
					optionText: answer.option ? answer.option.text : null,
					isCorrect: question.type === "MCQ" ? answer.option?.isCorrect : undefined,
					studentTrueOrFalse:
						question.type === "Medical" ? answer.studentTrueOrFalse : undefined,
					correctAnswer:
						question.type === "Medical" ? answer.option?.isCorrect : undefined,
					score: question.type === "Medical" ? answer.score : undefined,
				}));

				return {
					questionText: question.text,
					type: question.type,
					score: question.score,
					options: formattedOptions,
				};
			});

			return {
				examDetails: {
					name: result.exam.name,
					type: result.exam.type,
					duration: result.exam.duration,
					instruction: result.exam.instruction,
					course: {
						name: result.exam.course ? result.exam.course.name : null,
						code: result.exam.course ? result.exam.course.code : null,
					},
					session: result.exam.session ? result.exam.session.name : null,
					timing: {
						start: result.startTime,
						end: result.endTime,
						startDate: result.exam.startDate,
						endDate: result.exam.endDate,
					},
				},
				studentDetails: {
					name: result.student
						? `${result.student.firstName} ${result.student.lastName}`
						: null,
					email: result.student ? result.student.email : null,
					matricNo: result.student ? result.student.idNumber : null,
				},
				totalScore: result.totalScore,
				questions: formattedQuestions,
			};
		});

		return formattedResults;
	} catch (error) {
		throw new Error(`Error fetching exam results: ${error.message}`);
	}
};

export default {
	submitExamresult,
	fetchExamResult,
	fetchAllExamResults,
};
