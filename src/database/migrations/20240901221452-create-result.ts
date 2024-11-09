"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Results", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			totalScore: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			startTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			endTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			examId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			studentId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.dropTable("Results");
	},
};
