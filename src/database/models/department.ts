import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";
import Faculty from "./faculty";

export interface DepartmentAttributes {
	id?: Identifier;
	name: string;
	facultyId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Department
	extends Model<DepartmentAttributes>
	implements DepartmentAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public facultyId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Department.belongsTo(models.Faculty, {
			foreignKey: "facultyId",
			targetKey: "id",
			as: "faculties",
		});
	}
}
Department.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
		facultyId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Department",
	}
);

export default Department;
