import { QueryInterface } from "sequelize";
import semesterService from "../../services/semester.service";

import { v4 as uuidv4 } from "uuid";
module.exports = {
	async up(queryInterface: QueryInterface) {
		// await queryInterface.bulkInsert(
		// 	"Users",
		// 	[
		// 		{
		// 			id: uuidv4(),
		// 			firstName: "John",
		// 			lastName: "Doe",
		// 			email: "example@example.com",
		// 			createdAt: new Date(),
		// 			updatedAt: new Date(),
		// 		},
		// 	],
		// 	{}
		// );
		const semesters = [
			{
				id: uuidv4(),
				name: "Second Semester",
			},
		];
		try {
			for (const semesterData of semesters) {
				await semesterService.createSemester(semesterData);
			}
		} catch {
			console.log("Failed to create semesters");
		}
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("Semesters", null, {});
	},
};
