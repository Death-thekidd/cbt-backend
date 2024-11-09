"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Answers", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			studentTrueOrFalse: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			isCorrect: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			score: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			studentId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			examId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			questionId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			optionId: {
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
		await queryInterface.dropTable("Answers");
	},
};
