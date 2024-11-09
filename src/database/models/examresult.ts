import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface ExamresultAttributes {
	examId: Identifier;
	resultId: Identifier;
	submitted: boolean;
	updatedAt?: Date;
	createdAt?: Date;
}
class Examresult
	extends Model<ExamresultAttributes>
	implements ExamresultAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public examId!: Identifier;
	public resultId!: Identifier;
	public submitted!: boolean;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Examresult.belongsTo(models?.Exam, {
			foreignKey: "examId",
			targetKey: "id",
			as: "exams",
		});
		Examresult.belongsTo(models?.User, {
			foreignKey: "resultId",
			targetKey: "id",
			as: "results",
		});
	}
}
Examresult.init(
	{
		examId: DataTypes.UUID,
		resultId: DataTypes.UUID,
		submitted: DataTypes.BOOLEAN,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Examresult",
	}
);

export default Examresult;
