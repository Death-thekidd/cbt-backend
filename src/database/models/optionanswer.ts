import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface QuestionanswerAttributes {
	optionId: Identifier;
	answerId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Optionanswer
	extends Model<QuestionanswerAttributes>
	implements QuestionanswerAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public optionId!: Identifier;
	public answerId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Optionanswer.belongsTo(models?.Question, {
			foreignKey: "optionId",
			targetKey: "id",
			as: "questions",
		});
		Optionanswer.belongsTo(models?.Answer, {
			foreignKey: "answerId",
			targetKey: "id",
			as: "answers",
		});
	}
}
Optionanswer.init(
	{
		optionId: DataTypes.UUID,
		answerId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Optionanswer",
	}
);

export default Optionanswer;
