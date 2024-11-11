import {
	Model,
	DataTypes,
	Identifier,
	EnumDataType,
	FindOptions,
	BelongsToManyGetAssociationsMixinOptions,
	BelongsToManyAddAssociationsMixinOptions,
	BelongsToManyAddAssociationMixinOptions,
} from "sequelize";
import sequelizeConnection from "../connection";
import Course from "./course";
import Session from "./session";
import Question, { QuestionAttributes } from "./question";
import User from "./user";
import Result from "./result";

export interface ExamAttributes {
	id?: Identifier;
	name: string;
	type: string;
	status: string;
	startDate: Date;
	endDate: Date;
	duration: number;
	instruction: string;
	sessionId: Identifier;
	courseId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Exam extends Model<ExamAttributes> implements ExamAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public type!: string;
	public status!: string;
	public startDate!: Date;
	public endDate!: Date;
	public duration!: number;
	public instruction!: string;
	public sessionId!: Identifier;
	public courseId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;
	addQuestions: (
		questions: Question[],
		options?: BelongsToManyAddAssociationsMixinOptions
	) => Promise<Question[]>;
	addQuestion: (
		question: Question,
		options?: BelongsToManyAddAssociationMixinOptions
	) => Promise<Question>;
	removeQuestion: (question: Question) => Promise<Question[]>;
	Questions: Question[];
	getQuestions: (
		options?: BelongsToManyGetAssociationsMixinOptions
	) => Promise<Question[]>;

	addStudents: (
		students: User[],
		options?: BelongsToManyAddAssociationsMixinOptions
	) => Promise<User[]>;
	addStudent: (
		student: User,
		options?: BelongsToManyAddAssociationMixinOptions
	) => Promise<User>;
	removeStudent: (student: User) => Promise<User[]>;
	Students: User[];
	getStudents: (
		options?: BelongsToManyGetAssociationsMixinOptions
	) => Promise<User[]>;

	// addResults: (
	// 	results: Result[],
	// 	options?: BelongsToManyAddAssociationsMixinOptions
	// ) => Promise<Result[]>;
	// addResult: (
	// 	result: Result,
	// 	options?: BelongsToManyAddAssociationMixinOptions
	// ) => Promise<Result>;
	// removeResult: (result: Result) => Promise<Result[]>;
	// getResults: (
	// 	options?: BelongsToManyGetAssociationsMixinOptions
	// ) => Promise<Result[]>;

	static associate(models: any) {
		Exam.belongsTo(models.Course, {
			foreignKey: "courseId",
			targetKey: "id",
			as: "course",
		});
		Exam.belongsTo(models.Session, {
			foreignKey: "sessionId",
			targetKey: "id",
			as: "session",
		});
		Exam.belongsToMany(models?.Question, {
			through: "Examquestions",
			foreignKey: "examId",
			as: "questions",
		});
		Exam.belongsToMany(models?.User, {
			through: "Examstudents",
			foreignKey: "examId",
			as: "students",
		});
		// Exam.belongsToMany(models.Result, {
		// 	foreignKey: "examId",
		// 	through: "Examresults",
		// 	as: "results",
		// });
	}
}
Exam.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
		type: DataTypes.ENUM("MCQ", "Medical"),
		status: DataTypes.ENUM("Open", "Close"),
		startDate: DataTypes.DATE,
		endDate: DataTypes.DATE,
		duration: DataTypes.INTEGER,
		instruction: DataTypes.STRING,
		sessionId: DataTypes.UUID,
		courseId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Exam",
	}
);

export default Exam;
