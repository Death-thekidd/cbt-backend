"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Exams", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				autoIncrement: false,
			},
			name: {
				type: Sequelize.STRING,
			},
			startDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			endDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			duration: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			instruction: { type: Sequelize.TEXT, allowNull: true },
			type: {
				type: Sequelize.ENUM("MCQ", "Medical"),
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM("Open", "Close"),
				allowNull: false,
			},
			courseId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			sessionId: {
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
		await queryInterface.dropTable("Exams");
	},
};
