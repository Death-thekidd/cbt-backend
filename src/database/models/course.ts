import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";
import Department from "./department";
import Level from "./level";
import Semester from "./semester";

export interface CourseAttributes {
	id?: Identifier;
	name: string;
	code: string;
	departmentId: Identifier;
	levelId: Identifier;
	semesterId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Course extends Model<CourseAttributes> implements CourseAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public departmentId!: Identifier;
	public levelId!: Identifier;
	public semesterId!: Identifier;
	public code!: string;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Course.belongsTo(models.Department, {
			foreignKey: "departmentId",
			targetKey: "id",
			as: "departments",
		});
		Course.belongsTo(models.Level, {
			foreignKey: "levelId",
			targetKey: "id",
			as: "levels",
		});
		Course.belongsTo(models.Semester, {
			foreignKey: "semesterId",
			targetKey: "id",
			as: "semesters",
		});
	}
}
Course.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
		departmentId: DataTypes.UUID,
		levelId: DataTypes.UUID,
		semesterId: DataTypes.UUID,
		code: DataTypes.STRING,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Course",
	}
);

export default Course;
