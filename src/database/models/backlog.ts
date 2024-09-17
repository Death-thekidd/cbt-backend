import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";
import { BaseModel } from "./BaseModel";

export interface BacklogAttributes {
	id?: Identifier;
	operatorId: Identifier;
	activity: string;
	status: string;
	code: string;
	errorMessage: JSON;
	updatedAt?: Date;
	createdAt?: Date;
}
class Backlog extends Model<BacklogAttributes> implements BacklogAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public operatorId!: Identifier;
	public activity!: string;
	public status!: string;
	public code!: string;
	public errorMessage!: JSON;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {}
}
Backlog.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		operatorId: DataTypes.UUID,
		activity: DataTypes.STRING,
		errorMessage: DataTypes.JSON,
		status: DataTypes.STRING,
		code: DataTypes.STRING,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Backlog",
	}
);

export default Backlog;
