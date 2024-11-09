import { QueryInterface } from "sequelize";
import courseService from "../../services/course.service";

import { v4 as uuidv4 } from "uuid";
import { Department, Level, Semester } from "../models";
module.exports = {
	async up(queryInterface: QueryInterface) {
		const level = await Level.findOne({
			order: [["createdAt", "DESC"]],
			limit: 1,
		});
		const semester = await Semester.findOne({
			order: [["createdAt", "DESC"]],
			limit: 1,
		});
		const department = await Department.findOne({
			order: [["createdAt", "DESC"]],
			limit: 1,
		});

		const courses = [
			{
				id: uuidv4(),
				name: "Introduction to Computer Science",
				code: "CSC 101",
				levelId: level?.id,
				semesterId: semester?.id,
				departmentId: department?.id,
			},
		];
		try {
			for (const courseData of courses) {
				await courseService.createCourse(courseData);
			}
		} catch {
			console.log("Failed to create courses");
		}
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("Courses", null, {});
	},
};
