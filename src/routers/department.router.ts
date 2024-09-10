import { Router } from "express";
import {
	createDepartment,
	getDepartments,
	updateDepartment,
	deleteDepartments,
	countDepartments,
} from "../controllers/department.controller";

const router = Router();

router.post("/create", createDepartment);
router.get("/", getDepartments);
router.get("/count", countDepartments);
router.patch("/:departmentId", updateDepartment);
router.delete("/:departmentId", deleteDepartments);

export = router;
