import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface SemesterAttributes {
	id?: Identifier;
	name: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class Semester extends Model<SemesterAttributes> implements SemesterAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {}
}
Semester.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Semester",
	}
);

export default Semester;
