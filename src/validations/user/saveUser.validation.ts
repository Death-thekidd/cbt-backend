import validation from "../Validation";
import { body } from "express-validator";

const authorize = () => {
	return validation(rules());
};

const rules = () => {
	return [
		body("email").optional().isEmail(),
		body("firstName", "First name doesn't exist").not().isEmpty().trim().escape(),
		body("lastName", "Last name doesn't exist").not().isEmpty().trim().escape(),
	];
};

export = authorize();
