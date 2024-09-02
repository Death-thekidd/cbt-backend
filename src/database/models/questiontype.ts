import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface QuestiontypeAttributes {
	id?: Identifier;
	name: string;
	description: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class Questiontype
	extends Model<QuestiontypeAttributes>
	implements QuestiontypeAttributes
{
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
Questiontype.init(
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
		modelName: "Questiontype",
	}
);

export default Questiontype;
