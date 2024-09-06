import argon2 from "argon2";
import jwt from "jsonwebtoken";

//Should move this to environment variables
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyHash = async (hash: string, text: string) => {
	return argon2.verify(hash, text);
};

exports.hash = (value: string) => {
	return argon2.hash(value);
};

exports.sign = (data: any, options: any) => {
	return jwt.sign(data, SECRET_KEY, options);
};
