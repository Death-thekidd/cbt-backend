import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface LevelAttributes {
	id?: Identifier;
	name: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class Level extends Model<LevelAttributes> implements LevelAttributes {
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
Level.init(
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
		modelName: "Level",
	}
);

export default Level;
