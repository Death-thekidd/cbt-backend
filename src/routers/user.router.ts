import { Router } from "express";
import {
	getUsers,
	loginUser,
	createUser,
	getUserById,
	newPassword,
	updateUserById,
	deleteUsers,
	getUserExamsById,
} from "../controllers/user.controller";
import validateToken from "../middlewares/validateToken";
import loginUserValidation from "../validations/user/loginUser.validation";
import createUserValidation from "../validations/user/createUser.validation";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.get("/exams/:userId", getUserExamsById);

router.patch("/:userId", updateUserById);

router.post("/register", createUserValidation, createUser);
router.post("/login", loginUserValidation, loginUser);
router.post("/new-password", validateToken, newPassword);

router.delete("/:userId", deleteUsers);

export = router;
