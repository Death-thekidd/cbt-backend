"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Questions", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
			},
			courseId: {
				type: Sequelize.UUID,
			},
			sessionId: {
				type: Sequelize.UUID,
			},
			questiontypeId: {
				type: Sequelize.UUID,
			},
			questionText: {
				type: Sequelize.TEXT,
			},
			options: {
				type: Sequelize.JSON,
			},
			answer: {
				type: Sequelize.JSON,
			},
			score: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Questions");
	},
};
