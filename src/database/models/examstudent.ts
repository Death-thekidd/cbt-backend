import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface ExamstudentAttributes {
	examId: Identifier;
	studentId: Identifier;
	submitted: boolean;
	updatedAt?: Date;
	createdAt?: Date;
}
class Examstudent
	extends Model<ExamstudentAttributes>
	implements ExamstudentAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public examId!: Identifier;
	public studentId!: Identifier;
	public submitted!: boolean;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Examstudent.belongsTo(models?.Exam, {
			foreignKey: "examId",
			targetKey: "id",
			as: "exams",
		});
		Examstudent.belongsTo(models?.User, {
			foreignKey: "studentId",
			targetKey: "id",
			as: "students",
		});
	}
}
Examstudent.init(
	{
		examId: DataTypes.UUID,
		studentId: DataTypes.UUID,
		submitted: DataTypes.BOOLEAN,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Examstudent",
	}
);

export default Examstudent;
