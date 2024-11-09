import { QueryInterface } from "sequelize";
import sessionService from "../../services/session.service";

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
		const sessions = [
			{
				id: uuidv4(),
				name: "2021/2022 Session",
			},
		];
		try {
			for (const sessionData of sessions) {
				await sessionService.createSession(sessionData);
			}
		} catch {
			console.log("Failed to create session");
		}
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("Sessions", null, {});
	},
};
