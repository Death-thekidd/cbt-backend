import User from "./user";
import Backlog from "./backlog";
import Course from "./course";
import Department from "./department";
import Exam from "./exam";
import Examresult from "./examresult";
import Examtype from "./examtype";
import Examquestion from "./examquestion";
import Faculty from "./faculty";
import Level from "./level";
import Semester from "./semester";
import Session from "./session";
import Question from "./question";
import Questiontype from "./questiontype";

// Define a type for the models
type Models = {
	User: typeof User;
	Backlog: typeof Backlog;
	Course: typeof Course;
	Department: typeof Department;
	Exam: typeof Exam;
	Examresult: typeof Examresult;
	Examtype: typeof Examtype;
	Examquestion: typeof Examquestion;
	Faculty: typeof Faculty;
	Level: typeof Level;
	Semester: typeof Semester;
	Session: typeof Session;
	Question: typeof Question;
	Questiontype: typeof Questiontype;
};

// Create the models object
const models: Models = {
	User,
	Backlog,
	Course,
	Department,
	Exam,
	Examresult,
	Examtype,
	Examquestion,
	Faculty,
	Level,
	Semester,
	Session,
	Question,
	Questiontype,
};

// Loop through each model and call associate
Object.keys(models).forEach((modelName) => {
	const model = models[modelName as keyof Models]; // Use type assertion here
	if (model.associate) {
		model.associate(models);
	}
});

export {
	User,
	Backlog,
	Course,
	Department,
	Exam,
	Examresult,
	Examtype,
	Examquestion,
	Faculty,
	Level,
	Semester,
	Session,
	Question,
	Questiontype,
};
