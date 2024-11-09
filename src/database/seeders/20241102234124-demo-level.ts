import { QueryInterface } from "sequelize";
import levelService from "../../services/level.service";

import { v4 as uuidv4 } from "uuid";
module.exports = {
	async up(queryInterface: QueryInterface) {
		const levels = [
			{
				id: uuidv4(),
				name: "100",
			},
		];
		try {
			for (const levelData of levels) {
				await levelService.createLevel(levelData);
			}
		} catch {
			console.log("Failed to create levels");
		}
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("Levels", null, {});
	},
};
