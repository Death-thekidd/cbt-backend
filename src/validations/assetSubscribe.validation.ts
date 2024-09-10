import validation from "./Validation";
import { body } from "express-validator";

const authorize = () => {
	return validation(rules());
};

const rules = () => {
	return [body("assetId").exists()];
};

export = authorize();
