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
			sessionId: {
				type: Sequelize.UUID,
			},
			courseId: {
				type: Sequelize.UUID,
			},
			examtypeId: {
				type: Sequelize.UUID,
			},
			startDate: {
				type: Sequelize.DATE,
			},
			endDate: {
				type: Sequelize.DATE,
			},
			duration: {
				type: Sequelize.STRING,
			},
			instruction: { type: Sequelize.TEXT, allowNull: true },
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
