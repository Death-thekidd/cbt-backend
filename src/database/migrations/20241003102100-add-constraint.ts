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
		table: "Examresults",
		field: "examId",
		name: "examr_exam",
		references: { table: "Exams", field: "id" },
	},
	{
		table: "Examresults",
		field: "userId",
		name: "examr_user",
		references: { table: "Users", field: "id" },
	},
	{
		table: "Questions",
		field: "questiontypeId",
		name: "question_questiont",
		references: { table: "Questiontypes", field: "id" },
	},
	{
		table: "Questions",
		field: "courseId",
		name: "question_course",
		references: { table: "Courses", field: "id" },
	},
	{
		table: "Questions",
		field: "sessionId",
		name: "question_session",
		references: { table: "Sessions", field: "id" },
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
