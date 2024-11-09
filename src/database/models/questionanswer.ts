import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface QuestionanswerAttributes {
	questionId: Identifier;
	answerId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Questionanswer
	extends Model<QuestionanswerAttributes>
	implements QuestionanswerAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public questionId!: Identifier;
	public answerId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Questionanswer.belongsTo(models?.Question, {
			foreignKey: "questionId",
			targetKey: "id",
			as: "questions",
		});
		Questionanswer.belongsTo(models?.Answer, {
			foreignKey: "answerId",
			targetKey: "id",
			as: "answers",
		});
	}
}
Questionanswer.init(
	{
		questionId: DataTypes.UUID,
		answerId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Questionanswer",
	}
);

export default Questionanswer;
