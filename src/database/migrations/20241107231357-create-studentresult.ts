"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Studentresults", {
			studentId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			resultId: {
				type: Sequelize.UUID,
				allowNull: false,
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
		await queryInterface.dropTable("Studentresults");
	},
};
