import { QueryInterface } from "sequelize";
import facultyService from "../../services/faculty.service";

import { v4 as uuidv4 } from "uuid";
module.exports = {
	async up(queryInterface: QueryInterface) {
		const faculties = [
			{
				id: uuidv4(),
				name: "Faculty of Science",
			},
		];
		try {
			for (const facultyData of faculties) {
				await facultyService.createFaculty(facultyData);
			}
		} catch {
			console.log("Failed to create faculties");
		}
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("Faculties", null, {});
	},
};
