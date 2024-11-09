import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface StudentresultAttributes {
	studentId: Identifier;
	resultId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Studentresult
	extends Model<StudentresultAttributes>
	implements StudentresultAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public studentId!: Identifier;
	public resultId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Studentresult.belongsTo(models?.User, {
			foreignKey: "studentId",
			targetKey: "id",
			as: "students",
		});
		Studentresult.belongsTo(models?.User, {
			foreignKey: "resultId",
			targetKey: "id",
			as: "results",
		});
	}
}
Studentresult.init(
	{
		studentId: DataTypes.UUID,
		resultId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Studentresult",
	}
);

export default Studentresult;
