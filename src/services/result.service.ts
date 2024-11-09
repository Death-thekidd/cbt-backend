import { listenerCount } from "process";
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
	exams?: Exam & {
		questions?: Question &
			{
				answers?: Answer &
					{
						optionText?: string;
						optionIsTrueorFalse?: boolean;
					}[];
			}[];
	};
	students?: User;
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
			const question = exam.Questions.find((q) => q.id === questionId);
			if (!question) throw new Error(`Invalid question ID: ${questionId}`);

			let questionScore = 0;
			const optionScore = question.score / question.Options.length; // Evenly distributed question score

			if (question.type === "MCQ") {
				const selectedOption = selectedOptions[0];
				const correctOption = question.Options.find((o) => o.isCorrect);
				const isCorrect = correctOption?.id === selectedOption.optionId;

				// Full score or zero based on correctness
				questionScore = isCorrect ? question.score : 0;

				// Save the answer via Option's addAnswer method
				const answerCreated = await Answer.create(
					{
						studentId,
						questionId,
						optionId: selectedOption.optionId,
						isCorrect,
						studentTrueOrFalse: selectedOption.trueOrFalse,
						score: questionScore,
					},
					{ transaction }
				);
				await correctOption?.addAnswer(answerCreated, { transaction });
			} else if (question.type === "Medical") {
				for (const selectedOption of selectedOptions) {
					const option = question.Options.find(
						(o) => o.id === selectedOption.optionId
					);
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
							studentId,
							questionId,
							optionId: option.id,
							studentTrueOrFalse: selectedOption.trueOrFalse,
							isCorrect,
							score: optionResultScore,
						},
						{ transaction }
					);
					await option.addAnswer(answerCreated, { transaction });
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

		// Add the result to the exam using Exam's addResult method
		await exam.addResult(result, { transaction });

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
		if (transaction) await transaction.rollback();
		throw error;
	}
};

const fetchExamResult = async (studentId: string, examId: string) => {
	try {
		const result: ExtendedResult = await Result.findOne({
			where: { studentId, examId },
			attributes: [
				"totalScore",
				"startTime",
				"endTime",
				[col("exams.name"), "examName"],
				[col("exams.type"), "examType"],
				[col("exams.startDate"), "examStartDate"],
				[col("exams.endDate"), "examEndDate"],
				[col("exams.duration"), "examDuration"],
				[col("exams.instruction"), "examInstruction"],
				[col("exams.sessions.name"), "sessionName"],
				[col("exams.courses.name"), "courseName"],
				[col("exams.courses.code"), "courseCode"],
				[col("students.name"), "studentName"],
				[col("students.email"), "studentEmail"],
				[col("students.idNumber"), "studentMatricNo"],
			],
			include: [
				{
					model: Exam,
					as: "exams",
					required: true,
					include: [
						{
							model: Question,
							as: "questions",
							include: [
								{
									model: Answer,
									attributes: [
										"isCorrect",
										"score",
										"studentTrueOrFalse",
										[col("options.text"), "optionText"],
										[col("options.isCorrect"), "optionIsTrueorFalse"],
									],
									as: "answers",
									where: { studentId },
									include: [
										{
											model: Option,
											as: "options",
										},
									],
								},
							],
						},
						{ model: Session, as: "sessions" },
						{ model: Course, as: "courses" },
					],
				},
				{
					model: User,
					as: "students",
				},
			],
		});

		if (!result) {
			throw new Error("Exam result not found.");
		}

		const formattedQuestions = result.exams.questions.map((question: any) => {
			const formattedOptions = question.answers.map((answer: any) => {
				return {
					optionText: answer.optionText,
					isCorrect:
						question.type === "MCQ" ? answer.optionIsTrueorFalse : undefined,
					studentTrueOrFalse:
						question.type === "Medical" ? answer.studentTrueOrFalse : undefined,
					correctAnswer:
						question.type === "Medical" ? answer.optionIsTrueorFalse : undefined,
					score: question.type === "Medical" ? answer.score : undefined,
				};
			});

			return {
				questionText: question.text,
				type: question.type,
				score: question.score,
				options: formattedOptions,
			};
		});

		return {
			examDetails: {
				name: result.examName,
				type: result.examType,
				duration: result.examDuration,
				instruction: result.examInstruction,
				course: {
					name: result.courseName,
					code: result.courseCode,
				},
				session: result.sessionName,
				timing: {
					start: result.startTime,
					end: result.endTime,
					startDate: result.examStartDate,
					endDate: result.examEndDate,
				},
			},
			studentDetails: {
				name: result.studentName,
				email: result.studentEmail,
				matricNo: result.studentMatricNo,
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
	try {
		const exam = await Exam.findOne({ where: { id: examId } });
		if (!exam) throw new Error(`Exam with ID ${examId} not found`);

		const results = await Result.findAll({
			where: { examId },
			attributes: [
				"totalScore",
				"startTime",
				"endTime",
				[col("exams.name"), "examName"],
				[col("exams.type"), "examType"],
				[col("exams.startDate"), "examStartDate"],
				[col("exams.endDate"), "examEndDate"],
				[col("exams.duration"), "examDuration"],
				[col("exams.instruction"), "examInstruction"],
				[col("exams.sessions.name"), "sessionName"],
				[col("exams.courses.name"), "courseName"],
				[col("exams.courses.code"), "courseCode"],
				[col("students.name"), "studentName"],
				[col("students.email"), "studentEmail"],
				[col("students.idNumber"), "studentMatricNo"],
			],
			include: [
				{
					model: Exam,
					as: "exams",
					required: true,
					include: [
						{
							model: Question,
							as: "questions",
							attributes: ["id", "text", "type", "score"],
							include: [
								{
									model: Answer,
									as: "answers",
									where: { studentId: col("Examresult.studentId") },
									attributes: ["isCorrect", "score", "studentTrueOrFalse"],
								},
								{
									model: Option,
									as: "options",
									attributes: ["id", "text", "isCorrect"],
								},
							],
						},
						{ model: Session, as: "sessions" },
						{ model: Course, as: "courses" },
					],
				},
				{
					model: User,
					as: "students",
					required: true,
				},
			],
			order: [["totalScore", "DESC"]],
		});

		const formattedResults = results.map((result: ExtendedResult) => {
			const formattedQuestions = result.exams.questions.map((question: any) => {
				const formattedOptions = question.answers.map((answer: any) => {
					const selectedOption = question.options.find(
						(o: any) => o.id === answer.optionId
					);
					return {
						optionId: selectedOption?.id,
						text: selectedOption?.text,
						isCorrect: selectedOption?.isCorrect,
						selected: answer.studentTrueOrFalse,
					};
				});

				return {
					questionId: question.id,
					questionText: question.text,
					type: question.type,
					score: question.score,
					options: formattedOptions,
				};
			});

			return {
				examDetails: {
					name: result.examName,
					type: result.examType,
					courseCode: result.courseCode,
					sessionName: result.sessionName,
				},
				student: {
					name: result.studentName,
					email: result.studentEmail,
					matricNo: result.studentMatricNo,
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
