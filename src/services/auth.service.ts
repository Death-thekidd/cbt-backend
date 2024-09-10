import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../util/secrets";

// Should move this to environment variables
const SECRET_KEY = process.env.SECRET_KEY;

const verifyHash = async (hash: string, text: string) => {
	return bcrypt.compare(text, hash);
};

const hash = async (value: string) => {
	const saltRounds = 10; // You can adjust the salt rounds as needed
	return bcrypt.hash(value, saltRounds);
};

const sign = (data: any, options: any) => {
	return jwt.sign(data, SESSION_SECRET, options);
};

export default {
	verifyHash,
	hash,
	sign,
};
