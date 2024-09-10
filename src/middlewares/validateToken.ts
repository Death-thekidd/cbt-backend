import on from "../lib/on";
import createResponder from "../lib/respondAndLog";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Identifier } from "sequelize";
import { SESSION_SECRET } from "../util/secrets";

// Define the expected structure of token data
interface TokenData extends JwtPayload {
	action: string;
	email: string;
	id: Identifier;
}

const validateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const respondAndLog = createResponder(req, res);
	const activity = "VALIDATE_TOKEN";

	const tokenHeader = req.headers["authorization"];
	const scheme = "Bearer ";

	if (!tokenHeader) {
		return respondAndLog({
			activity,
			status: 401,
			code: "TOKEN_NOT_FOUND",
		});
	}

	if (!tokenHeader.startsWith(scheme)) {
		return respondAndLog({
			activity,
			status: 401,
			code: "INVALID_AUTHORIZATION_SCHEME",
		});
	}

	// Remove the scheme from the authorization text
	const token = tokenHeader.slice(scheme.length).trimLeft();

	// Verify the token
	jwt.verify(token, SESSION_SECRET, (error, tokenData) => {
		if (error) {
			return createErrorHandler(req, res)(error);
		}

		// Type assertion to ensure tokenData is of type TokenData
		req.tokenData = tokenData as TokenData;

		next();
	});
};

function createErrorHandler(req: Request, res: Response) {
	const respondAndLog = createResponder(req, res);
	const activity = "VALIDATE_TOKEN";

	return function handleError(error: any) {
		if (error.name === "TokenExpiredError") {
			respondAndLog({
				activity,
				status: 401,
				code: "TOKEN_EXPIRED",
			});
		} else if (error.name === "JsonWebTokenError") {
			respondAndLog({
				activity,
				status: 401,
				code: "TOKEN_INVALID",
			});
		} else {
			respondAndLog({
				activity,
				status: 401,
				code: "COULD_NOT_VALIDATE_TOKEN",
			});
		}
	};
}

export = validateToken; // Use CommonJS export
