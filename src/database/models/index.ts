import User from "./user";
import Backlog from "./backlog";
import Course from "./course";
import Department from "./department";
import Exam from "./exam";
import Result from "./result";
import Examquestion from "./examquestion";
import Faculty from "./faculty";
import Level from "./level";
import Semester from "./semester";
import Session from "./session";
import Question from "./question";
import Answer from "./answer";
import Option from "./option";
import Examstudent from "./examstudent";
import Questionoption from "./questionoption";
import Questionanswer from "./questionanswer";

// Define a type for the models
type Models = {
	User: typeof User;
	Backlog: typeof Backlog;
	Course: typeof Course;
	Department: typeof Department;
	Exam: typeof Exam;
	Result: typeof Result;
	Examquestion: typeof Examquestion;
	Examstudent: typeof Examstudent;
	Faculty: typeof Faculty;
	Level: typeof Level;
	Semester: typeof Semester;
	Session: typeof Session;
	Question: typeof Question;
	Answer: typeof Answer;
	Option: typeof Option;
	Questionoption: typeof Questionoption;
	Questionanswer: typeof Questionanswer;
};

// Create the models object
const models: Models = {
	User,
	Backlog,
	Course,
	Department,
	Exam,
	Result,
	Examquestion,
	Examstudent,
	Faculty,
	Level,
	Semester,
	Session,
	Question,
	Answer,
	Option,
	Questionoption,
	Questionanswer,
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
	Result,
	Examquestion,
	Examstudent,
	Faculty,
	Level,
	Semester,
	Session,
	Question,
	Answer,
	Option,
	Questionoption,
	Questionanswer,
};
