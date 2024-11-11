"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Examstudents", {
			examId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			studentId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			submitted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				// allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				// allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.dropTable("Examstudents");
	},
};
