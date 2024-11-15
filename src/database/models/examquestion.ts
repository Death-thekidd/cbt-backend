import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface ExamquestionAttributes {
	examId: Identifier;
	questionId: Identifier;
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
	public examId!: Identifier;
	public questionId!: Identifier;
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
		examId: DataTypes.UUID,
		questionId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Examquestion",
	}
);

export default Examquestion;
