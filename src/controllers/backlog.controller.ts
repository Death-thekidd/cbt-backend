import sequelize from "sequelize";
import backlogService from "../services/backlog.service";
import { Request, Response } from "express";

const getBacklogs = async (req: Request, res: Response) => {
	try {
		const backlogs = await backlogService.getbacklogs();
		res.status(200).json({
			message: "backlogs fetched successfully",
			data: backlogs,
			status: 200,
			code: "BACKLOG_FETCHED",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "Error occurred, Internal Server Error", error });
	}
};

const getBacklogById = async (req: Request, res: Response) => {
	const data = req.params.backlogId;
	try {
		const backlog = await backlogService.getBacklogDetailById(data);
		res.status(200).json({
			message: "backlog fetched successfully",
			data: backlog,
			status: 200,
			code: "BACKLOG_FETCHED",
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error occurred, Internal Server Error", error });
	}
};

const getBacklogByUserId = async (req: Request, res: Response) => {
	const data = req.params.userId;
	try {
		const backlog = await backlogService.getBacklogByUserId(data);
		res.status(200).json({
			message: "backlog fetched successfully",
			data: backlog,
			status: 200,
			code: "BACKLOG_FETCHED",
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error occurred, Internal Server Error", error });
	}
};

export { getBacklogs, getBacklogById, getBacklogByUserId };
