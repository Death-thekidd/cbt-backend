"use strict";
import { QueryInterface } from "sequelize";

const constraints = [
	{
		table: "Departments",
		field: "facultyId",
		name: "department_faculty",
		references: { table: "Faculties", field: "id" },
	},
	{
		table: "Courses",
		field: "departmentId",
		name: "course_department",
		references: { table: "Departments", field: "id" },
	},
	{
		table: "Courses",
		field: "levelId",
		name: "course_level",
		references: { table: "Levels", field: "id" },
	},
	{
		table: "Courses",
		field: "semesterId",
		name: "course_semester",
		references: { table: "Semesters", field: "id" },
	},
	{
		table: "Exams",
		field: "courseId",
		name: "exam_course",
		references: { table: "Courses", field: "id" },
	},
	{
		table: "Exams",
		field: "sessionId",
		name: "exam_session",
		references: { table: "Sessions", field: "id" },
	},
	{
		table: "Examquestions",
		field: "examId",
		name: "examq_exam",
		references: { table: "Exams", field: "id" },
	},
	{
		table: "Examquestions",
		field: "questionId",
		name: "examq_question",
		references: { table: "Questions", field: "id" },
	},
	{
		table: "Examstudents",
		field: "examId",
		name: "exams_exam",
		references: { table: "Exams", field: "id" },
	},
	{
		table: "Examstudents",
		field: "studentId",
		name: "exams_student",
		references: { table: "Users", field: "id" },
	},
	{
		table: "Results",
		field: "examId",
		name: "result_exam",
		references: { table: "Exams", field: "id" },
	},
	{
		table: "Results",
		field: "studentId",
		name: "result_student",
		references: { table: "Users", field: "id" },
	},
	{
		table: "Questions",
		field: "courseId",
		name: "question_course",
		references: { table: "Courses", field: "id" },
	},
	{
		table: "Options",
		field: "questionId",
		name: "option_question",
		references: { table: "Questions", field: "id" },
	},
	{
		table: "Answers",
		field: "studentId",
		name: "answer_student",
		references: { table: "Users", field: "id" },
	},
	{
		table: "Answers",
		field: "examId",
		name: "answer_exam",
		references: { table: "Exams", field: "id" },
	},
	{
		table: "Answers",
		field: "optionId",
		name: "answer_option",
		references: { table: "Options", field: "id" },
	},
	{
		table: "Answers",
		field: "questionId",
		name: "answer_question",
		references: { table: "Questions", field: "id" },
	},
	{
		table: "Questionoptions",
		field: "questionId",
		name: "questiono_question",
		references: { table: "Questions", field: "id" },
	},
	{
		table: "Questionoptions",
		field: "optionId",
		name: "questiono_option",
		references: { table: "Options", field: "id" },
	},
	{
		table: "Questionanswers",
		field: "questionId",
		name: "questiona_question",
		references: { table: "Questions", field: "id" },
	},
	{
		table: "Questionanswers",
		field: "answerId",
		name: "questiona_answer",
		references: { table: "Answers", field: "id" },
	},
];

module.exports = {
	async up(queryInterface: QueryInterface) {
		for (const constraint of constraints) {
			await queryInterface.addConstraint(constraint.table, {
				fields: [constraint.field],
				type: "foreign key",
				name: constraint.name,
				references: constraint.references,
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	},

	async down(queryInterface: QueryInterface) {
		for (const constraint of constraints) {
			await queryInterface.removeConstraint(constraint.table, constraint.name);
		}
	},
};
