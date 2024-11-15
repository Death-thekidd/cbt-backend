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
			text: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			topic: {
				type: Sequelize.TEXT,
			},
			score: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			type: {
				type: Sequelize.ENUM("MCQ", "Medical"),
				allowNull: false,
			},
			courseId: {
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
		await queryInterface.dropTable("Questions");
	},
};
