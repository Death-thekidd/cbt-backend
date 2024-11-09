"use strict";
import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			firstName: {
				type: Sequelize.STRING,
			},
			lastName: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			// matricNo: {
			// 	type: Sequelize.STRING,
			// 	allowNull: true,
			// },
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.STRING,
			},
			canLogin: {
				type: Sequelize.BOOLEAN,
			},
			phone: {
				type: Sequelize.STRING,
			},
			gender: {
				type: Sequelize.STRING,
			},
			idNumber: {
				type: Sequelize.STRING,
			},
			picUrl: {
				type: Sequelize.TEXT,
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
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("Users");
	},
};
