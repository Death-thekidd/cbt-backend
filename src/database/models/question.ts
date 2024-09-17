import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";
import Course from "./course";

export interface QuestionAttributes {
	id?: Identifier;
	name: string;
	sessionId: Identifier;
	courseId: Identifier;
	questiontypeId: Identifier;
	questionText: string;
	options: JSON;
	answer: JSON;
	score: number;
	updatedAt?: Date;
	createdAt?: Date;
}
class Question extends Model<QuestionAttributes> implements QuestionAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public sessionId!: Identifier;
	public courseId!: Identifier;
	public questiontypeId!: Identifier;
	public questionText!: string;
	public options!: JSON;
	public answer!: JSON;
	public score!: number;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Question.belongsTo(models.Questiontype, {
			foreignKey: "questiontypeId",
			targetKey: "id",
			as: "questiontypes",
		});
		Question.belongsTo(models.Course, {
			foreignKey: "courseId",
			targetKey: "id",
			as: "courses",
		});
		Question.belongsTo(models.Session, {
			foreignKey: "sessionId",
			targetKey: "id",
			as: "sessions",
		});
	}
}
Question.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
		courseId: DataTypes.UUIDV4,
		sessionId: DataTypes.UUIDV4,
		questiontypeId: DataTypes.UUID,
		questionText: DataTypes.TEXT,
		options: DataTypes.JSON,
		answer: DataTypes.JSON,
		score: DataTypes.INTEGER,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Question",
	}
);

export default Question;
