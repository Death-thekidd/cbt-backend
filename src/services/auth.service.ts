import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../util/secrets";

//Should move this to environment variables
const SECRET_KEY = process.env.SECRET_KEY;

const verifyHash = async (hash: string, text: string) => {
	return argon2.verify(hash, text);
};

const hash = (value: string) => {
	return argon2.hash(value);
};

const sign = (data: any, options: any) => {
	return jwt.sign(data, SESSION_SECRET, options);
};

export default {
	verifyHash,
	hash,
	sign,
};
