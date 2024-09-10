import sequelize from "sequelize";
import on from "../lib/on";
import courseService from "../services/course.service";
import authService from "../services/auth.service";

import createResponder from "../lib/respondAndLog";
import { Request, Response } from "express";

/**
 * Create Course
 * User: Admin
 */
const createCourse = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "CREATE_NOTE";
	const { name, code, departmentId, levelId, semesterId } = req.body;

	//data2 = req.user.id
	try {
		const course = await courseService.createCourse({
			name,
			code,
			departmentId,
			levelId,
			semesterId,
		});
		respondAndLog({
			activity,
			status: 200,
			code: "COURSE_CREATED",
			data: course,
			message: "Course created successfully",
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
 * Get Courses
 */
const getCourses = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "FETCH_ALL_COURSES";
	try {
		const courses = await courseService.getCourses();
		respondAndLog({
			activity,
			status: 200,
			code: "COURSES_FETCHED",
			data: courses,
			message: "Courses fetched successfully",
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
 * Count Courses
 */
const countCourses = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "COUNT_ALL_COURSES";
	try {
		const courses = await courseService.countCourses();
		respondAndLog({
			activity,
			status: 200,
			code: "COURSES_COUNTED",
			data: courses,
			message: "Courses counted successfully",
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

//Update Course
const updateCourse = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "UPDATE_COURSE";
	let courseId = req.params.courseId;
	let data = req.body;

	try {
		const course = await courseService.updateCourse({ courseId, data });
		respondAndLog({
			activity,
			status: 200,
			code: "COURSES_UPDATED",
			data: data,
			message: "Course updated successfully",
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
 * Delete Course
 *
 */
const deleteCourses = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res),
		activity = "DELETE_COURSE";
	let data = req.params.courseId;
	console.log(data);

	try {
		const notes = await courseService.deleteCourse(data);
		respondAndLog({
			activity,
			status: 200,
			code: "COURSE_DELETED",
			data: notes,
			message: "Course deleted successfully",
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

const getCourseById = async (req: Request, res: Response) => {
	const respondAndLog = createResponder(req, res);
	const activity = "FETCH-COURSE";
	const data = req.params.courseId;

	try {
		const course = await courseService.getCourseById(data);

		return respondAndLog({
			activity,
			status: 200,
			code: "COURSE_FETCHED",
			data: course,
			message: "course fetched successfully",
		});

		//res.status(200).json({message:"examresult fetched successfully", data:examresult, status: 200, code: "COURSE-RESULT_FETCHED"});
	} catch (error) {
		console.log(error.message);
		return respondAndLog({
			activity,
			status: 500,
			code: "INTERNAL_SERVER_ERROR",
			errorMessage: error.message,
			message: "Something went wrong, contact support.",
		});
	}
};

export {
	createCourse,
	getCourses,
	getCourseById,
	countCourses,
	updateCourse,
	deleteCourses,
};
