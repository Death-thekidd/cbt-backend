import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface FacultyAttributes {
	id?: Identifier;
	name: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class Faculty extends Model<FacultyAttributes> implements FacultyAttributes {
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
Faculty.init(
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
		modelName: "Faculty",
	}
);

export default Faculty;
