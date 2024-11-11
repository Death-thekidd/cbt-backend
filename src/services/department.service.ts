import exp from "constants";
import { Department, Faculty } from "../database/models";
import { Identifier, Op, col } from "sequelize";

/**
 * Create Department
 * User: Admin
 */

const createDepartment = async (data: any) => {
	// As this will be consumed as a service, we might need to do validation directly here
	try {
		return await Department.create({ ...data });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/**
 * Get all Departments
 * User: Admin
 */

const getDepartments = async () => {
	try {
		return await Department.findAll({
			attributes: ["id", "name", [col("faculty.name"), "faculty"]],
			include: [{ model: Faculty, required: true, as: "faculty", attributes: [] }],
			order: [["name", "DESC"]],
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Count Departments
 */
const countDepartments = async () => {
	try {
		return await Department.count({});
	} catch (error) {
		throw error;
	}
};

/**
 * Create a new Department
 *


/***
 * Update  Department
 * 
*/
const updateDepartment = async ({
	departmentId,
	data,
}: {
	departmentId: Identifier;
	data: any;
}) => {
	///const userId = "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"

	try {
		return await Department.update(
			{
				name: data,
			},
			{
				where: { id: departmentId },
			}
		).catch(function (error) {
			throw error;
		});
	} catch (error) {}
};

/**
 * Delete Departments
 */
const deleteDepartment = async (data: any) => {
	try {
		return await Department.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export default {
	createDepartment,
	getDepartments,
	countDepartments,
	updateDepartment,
	deleteDepartment,
};
