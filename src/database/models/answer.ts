import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface AnswerAttributes {
	id?: Identifier;
	studentTrueOrFalse: boolean;
	isCorrect: boolean;
	score: number;
	examId: Identifier;
	studentId: Identifier;
	optionId: Identifier;
	questionId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Answer extends Model<AnswerAttributes> implements AnswerAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public studentTrueOrFalse!: boolean;
	public isCorrect!: boolean;
	public score!: number;
	public examId!: Identifier;
	public studentId!: Identifier;
	public optionId!: Identifier;
	public questionId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Answer.belongsTo(models.Exam, {
			foreignKey: "examId",
			targetKey: "id",
			as: "exams",
		});
		Answer.belongsTo(models.User, {
			foreignKey: "studentId",
			targetKey: "id",
			as: "users",
		});
		Answer.belongsToMany(models.Question, {
			through: "Questionanswers",
			foreignKey: "answerId",
			as: "questions",
		});
		Answer.belongsTo(models.Option, {
			foreignKey: "optionId",
			targetKey: "id",
			as: "option",
		});
	}
}
Answer.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		studentTrueOrFalse: DataTypes.BOOLEAN,
		isCorrect: DataTypes.BOOLEAN,
		score: DataTypes.FLOAT,
		examId: DataTypes.UUID,
		studentId: DataTypes.UUID,
		optionId: DataTypes.UUID,
		questionId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Answer",
	}
);

export default Answer;
