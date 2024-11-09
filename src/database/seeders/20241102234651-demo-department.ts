import { QueryInterface } from "sequelize";
import departmentService from "../../services/department.service";

import { v4 as uuidv4 } from "uuid";
import { Faculty } from "../models";

module.exports = {
	async up(queryInterface: QueryInterface) {
		const faculty = await Faculty.findOne({
			order: [["createdAt", "DESC"]],
			limit: 1,
		});
		const departments = [
			{
				id: uuidv4(),
				name: "Computer Science",
				facultyId: faculty?.id,
			},
		];
		try {
			for (const departmentData of departments) {
				await departmentService.createDepartment(departmentData);
			}
		} catch {
			console.log("Failed to create departments");
		}
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("Departments", null, {});
	},
};
