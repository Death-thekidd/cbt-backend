import validation from "../Validation";
import { body } from "express-validator";

const authorize = () => {
	return validation(rules());
};

const rules = () => {
	return [
		body("firstName").exists(),
		body("lastName").exists(),
		body("email").isEmail(),
		body("password").exists(),
	];
};

export = authorize();
