import { QueryInterface } from "sequelize";
import userService from "../../services/user.service";
import authService from "../../services/auth.service";

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
		const users = [
			{
				id: uuidv4(),
				firstName: "test",
				lastName: "admin",
				idNumber: "adminID",
				canLogin: true,
				role: "admin",
				phone: "adminphone",
				email: "admin@test.com",
				password: "admin-pass",
				gender: "male",
			},
			{
				id: uuidv4(),
				firstName: "test",
				lastName: "lecturer",
				idNumber: "lecturerID",
				canLogin: true,
				role: "lecturer",
				phone: "lecturerhone",
				email: "lecturer@test.com",
				password: "lecturer-pass",
				gender: "female",
			},
			{
				id: uuidv4(),
				firstName: "test",
				lastName: "student",
				idNumber: "studentID",
				canLogin: true,
				role: "student",
				phone: "studentphone",
				email: "student@test.com",
				password: "student-pass",
				gender: "male",
			},
		];
		try {
			for (const userData of users) {
				const hash = await authService.hash(userData.password);
				await userService.createUser(hash, userData);
			}
		} catch {
			console.log("Failed to create users");
		}
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
