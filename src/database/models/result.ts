import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface ResultAttributes {
	id?: Identifier;
	totalScore: number;
	startTime: Date;
	endTime: Date;
	examId: Identifier;
	studentId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Result extends Model<ResultAttributes> implements ResultAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public totalScore!: number;
	public startTime!: Date;
	public endTime!: Date;
	public examId!: Identifier;
	public studentId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Result.belongsToMany(models.Exam, {
			foreignKey: "resultId",
			through: "ExamResults",
			as: "exams",
		});
		Result.belongsToMany(models.User, {
			foreignKey: "resultId",
			through: "StudentResults",
			as: "students",
		});
	}
}
Result.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		totalScore: DataTypes.FLOAT,
		startTime: DataTypes.DATE,
		endTime: DataTypes.DATE,
		examId: DataTypes.UUID,
		studentId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Result",
	}
);

export default Result;
