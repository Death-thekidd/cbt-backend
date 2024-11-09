"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Options", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			text: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			isCorrect: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			// optionScore: {
			// 	type: Sequelize.FLOAT,
			// 	allowNull: false,
			// },
			questionId: {
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
		await queryInterface.dropTable("Options");
	},
};
