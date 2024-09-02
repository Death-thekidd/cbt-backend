"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Examresults", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			examId: {
				type: Sequelize.UUID,
			},
			userId: {
				type: Sequelize.UUID,
			},
			questions: {
				type: Sequelize.JSON,
			},
			answers: {
				type: Sequelize.JSON,
			},
			score: {
				type: Sequelize.INTEGER,
			},
			startTime: {
				type: Sequelize.DATE,
			},
			endTime: {
				type: Sequelize.DATE,
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
		await queryInterface.dropTable("Examresults");
	},
};
