import { Request, Response } from "express";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import createResponder from "../lib/respondAndLog";
import on from "../lib/on";

const userController = {
	/**
	 * Get All Users
	 */
	getUsers: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_ALL_USERS";

		try {
			const users = await userService.getAllUsers();
			respondAndLog({
				activity,
				status: 200,
				code: "FETCHED_USERS",
				users,
				message: "Fetched users successfully",
			});
		} catch (error) {
			console.error(error);
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.message,
				message: "Something went wrong, contact support.",
			});
		}
	},

	/**
	 * Create User
	 */
	createUser: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_USER";

		try {
			const data = req.body;
			const userExists = await userService.getUserByEmail(data.email);
			if (userExists) {
				return respondAndLog({
					activity,
					status: 403,
					code: "USER_EXISTS",
					message: "Email already exists",
				});
			}

			const hash = await authService.hash(data.password);
			const user = await userService.createUser(hash, data);
			if (!user) {
				return respondAndLog({
					activity,
					status: 500,
					code: "INTERNAL_SERVER_ERROR",
					message: "Something went wrong, contact support",
				});
			}

			return respondAndLog({
				activity,
				status: 200,
				code: "USER_CREATED",
				message: "Account created",
			});
		} catch (error) {
			console.error(error);
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				message: "Something went wrong, contact support",
			});
		}
	},

	/**
	 * Login User
	 */
	loginUser: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "LOGIN_USER";

		try {
			const { email, password } = req.body;

			const user = await userService.getUserByEmail(email);
			if (!user) {
				return respondAndLog({
					activity,
					status: 403,
					code: "USER_NOT_FOUND",
					message: "Invalid email or password",
				});
			}

			const samePassword = await authService.verifyHash(user.password, password);
			if (!samePassword) {
				return respondAndLog({
					activity,
					status: 403,
					code: "INVALID_PASSWORD",
					message: "Invalid email or password",
				});
			}

			// Deal with token expiration and refresh
			const token = authService.sign({ id: user.id }, { expiresIn: "365d" });
			const role = user.role;
			const fullname = `${user.firstName} ${user.lastName}`;

			return respondAndLog({
				activity,
				status: 200,
				code: "LOGIN_SUCCESS",
				token,
				fullname,
				role,
				message: "Login successful",
			});
		} catch (error) {
			console.error(error);
			respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.message,
				message: "Something went wrong, contact support",
			});
		}
	},

	/**
	 * Create New Password
	 */
	newPassword: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "CREATE_NEW_PASSWORD";
		const { email, password } = req.body;

		// Make sure the user has the right permissions
		if (
			req.tokenData.action !== "NEW_PASSWORD" ||
			req.tokenData.email !== email
		) {
			return respondAndLog({
				activity,
				status: 403,
				code: "UNAUTHORIZED",
				message: "Unauthorized",
			});
		}

		const newPasswordHash = await authService.hash(password);

		// Update the user password
		const [updateFailed] = await on(
			userService.updateUserByEmail(email, { password: newPasswordHash })
		);

		if (updateFailed) {
			return respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				message: "Something went wrong, contact support",
			});
		}

		return respondAndLog({
			activity,
			status: 200,
			code: "PASSWORD_UPDATED",
			message: "Created new password",
		});
	},

	/**
	 * Get User By ID
	 */
	getUserById: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_USER";
		const userId = req.params.userId;

		try {
			const user = await userService.getUser(userId);
			return respondAndLog({
				activity,
				status: 200,
				code: "USER_FETCHED",
				data: user,
				message: "User fetched successfully",
			});
		} catch (error) {
			console.error(error.message);
			return respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.message,
				message: "Something went wrong, contact support.",
			});
		}
	},

	/**
	 * Update User By ID
	 */
	updateUserById: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "UPDATE_USER";
		const userId = req.params.userId;
		const data = req.body;

		try {
			const hash = await authService.hash(data.password);
			const user = await userService.updateUserById(userId, hash, data);
			respondAndLog({
				activity,
				status: 200,
				code: "USERS_UPDATED",
				data: user,
				message: "User updated successfully",
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
	},

	/**
	 * Delete User
	 */
	deleteUsers: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "DELETE_USER";
		const userId = req.params.userId;

		try {
			const users = await userService.deleteUser(userId);
			respondAndLog({
				activity,
				status: 200,
				code: "USER_DELETED",
				data: users,
				message: "User deleted successfully",
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
	},

	/**
	 * Get User Exams By ID
	 */
	getUserExamsById: async (req: Request, res: Response) => {
		const respondAndLog = createResponder(req, res);
		const activity = "FETCH_USER_EXAMS";
		const userId = req.params.userId;

		try {
			const exams = await userService.getUserExamsById(userId);
			return respondAndLog({
				activity,
				status: 200,
				code: "USER_EXAMS_FETCHED",
				data: exams,
				message: "User exams fetched successfully",
			});
		} catch (error) {
			console.error(error.message);
			return respondAndLog({
				activity,
				status: 500,
				code: "INTERNAL_SERVER_ERROR",
				errorMessage: error.message,
				message: "Something went wrong, contact support.",
			});
		}
	},
};

export = userController;
