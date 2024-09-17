import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";
import Exam from "./exam";
import Question from "./question";

export interface ExamquestionAttributes {
	id?: Identifier;
	examId: Identifier;
	questionId: Identifier;
	category: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class Examquestion
	extends Model<ExamquestionAttributes>
	implements ExamquestionAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public examId!: Identifier;
	public questionId!: Identifier;
	public category!: string;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Examquestion.belongsTo(models?.Exam, {
			foreignKey: "examId",
			targetKey: "id",
			as: "exams",
		});
		Examquestion.belongsTo(models?.Question, {
			foreignKey: "questionId",
			targetKey: "id",
			as: "questions",
		});
	}
}
Examquestion.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		examId: DataTypes.UUID,
		questionId: DataTypes.UUID,
		category: DataTypes.STRING,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Examquestion",
	}
);

export default Examquestion;
