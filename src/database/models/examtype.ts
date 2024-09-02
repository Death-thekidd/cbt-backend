import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface ExamtypeAttributes {
	id?: Identifier;
	name: string;
	description: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class Examtype extends Model<ExamtypeAttributes> implements ExamtypeAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public description!: string;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {}
}
Examtype.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
		description: DataTypes.STRING,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Examtype",
	}
);

export default Examtype;
