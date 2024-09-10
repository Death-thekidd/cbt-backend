import on from "../lib/on";
import createResponder from "../lib/respondAndLog";
import userService from "../services/user.service";
import { Request, Response, NextFunction } from "express";

const userRole =
	(role: string) => async (req: Request, res: Response, next: NextFunction) => {
		const respondAndLog = createResponder(req, res);
		const activity = "USER_ROLE";

		const id = req.tokenData.id;

		const [userNotFound, user] = await on(userService.getUser(id));

		if (userNotFound) {
			return respondAndLog({
				activity,
				status: 403,
				code: "USER_NOT_FOUND",
			});
		}

		req.user = user;

		next();
	};

export = userRole; // Use CommonJS export
