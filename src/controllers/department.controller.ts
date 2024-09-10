import sequelize from "sequelize";
import on from "../lib/on";
import departmentService from "../services/department.service";
import authService from "../services/auth.service";

import createResponder from "../lib/respondAndLog";
import { Request, Response } from "express";

/**
 * Create Department
 * User: Admin
 */
const createDepartment = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "CREATE_NOTE";
	const { name, facultyId } = req.body;

	//data2 = req.user.id
	try {
		const department = await departmentService.createDepartment({
			name,
			facultyId,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "DEPARTMENTS_CREATED",
			data: department,
			message: "Department created successfully",
		});
	} catch (error) {
		console.log(error);
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.stack,
			message: "Something went wrong, contact support",
		});
	}
};

/***
 * Get Departments
 */
const getDepartments = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "FETCH_ALL_DEPARTMENTS";
	try {
		const departments = await departmentService.getDepartments();
		respondAndLog({
			activity,
			status: 200,
			code: "DEPARTMENTS_FETCHED",
			data: departments,
			message: "Departments fetched successfully",
		});
	} catch (error) {
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.stack,
			message: "Something went wrong, contact support",
		});
	}
};

/**
 * Count Departments
 */
const countDepartments = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "COUNT_ALL_DEPARTMENTS";
	try {
		const departments = await departmentService.countDepartments();
		respondAndLog({
			activity,
			status: 200,
			code: "DEPARTMENTS_COUNTED",
			data: departments,
			message: "Departments counted successfully",
		});
	} catch (error) {
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.stack,
			message: "Something went wrong, contact support",
		});
	}
};

//Update Department
const updateDepartment = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "UPDATE_DEPARTMENT";
	const departmentId = req.params.departmentId;
	const name = req.body.name;

	try {
		const department = await departmentService.updateDepartment({
			departmentId,
			data: name,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "DEPARTMENTS_UPDATED",
			data: department,
			message: "Department updated successfully",
		});
	} catch (error) {
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.message,
			message: "Something went wrong, contact support",
		});
	}
};

/**
 * Delete Department
 *
 */
const deleteDepartments = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "DELETE_NOTE";
	const data = req.params.departmentId;
	console.log(data);

	try {
		const notes = await departmentService.deleteDepartment(data);
		respondAndLog({
			activity,
			status: 200,
			code: "DEPARTMENT_DELETED",
			data: notes,
			message: "Department deleted successfully",
		});
	} catch (error) {
		respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.stack,
			message: "Something went wrong, contact support",
		});
	}
};

export {
	createDepartment,
	getDepartments,
	countDepartments,
	updateDepartment,
	deleteDepartments,
};
