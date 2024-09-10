import { Router } from "express";

const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	console.log("Working");
	//   /res.render('index', { title: 'NOTE EAM' });
});

export = router;
