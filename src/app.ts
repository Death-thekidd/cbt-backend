import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";

// Routes
import indexRouter from "../src/routers/home.router";
import routes from "./routers/index.router";

import connection from "./database/connection";
import { Error } from "sequelize";

// Create Express server
const app = express();
app.use(cors());
app.use(logger("dev"));

// Sync the database
connection
	.authenticate()
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((err: Error) => {
		console.error("Unable to connect to the database:", err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api", routes);

/**
 * Primary app routes.
 */
app.get("/", (req, res) => {
	res.send("Express + TypeScript Server");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;
