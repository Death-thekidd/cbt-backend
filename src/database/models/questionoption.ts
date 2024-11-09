import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface QuestionoptionAttributes {
	questionId: Identifier;
	optionId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Questionoption
	extends Model<QuestionoptionAttributes>
	implements QuestionoptionAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public questionId!: Identifier;
	public optionId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Questionoption.belongsTo(models?.Question, {
			foreignKey: "questionId",
			targetKey: "id",
			as: "questions",
		});
		Questionoption.belongsTo(models?.Option, {
			foreignKey: "optionId",
			targetKey: "id",
			as: "options",
		});
	}
}
Questionoption.init(
	{
		questionId: DataTypes.UUID,
		optionId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Questionoption",
	}
);

export default Questionoption;
