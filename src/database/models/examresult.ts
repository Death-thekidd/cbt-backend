import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface ExamresultAttributes {
	id?: Identifier;
	examId: Identifier;
	userId: Identifier;
	questions: JSON;
	answers: JSON;
	score: number;
	startTime: Date;
	endTime: Date;
	updatedAt?: Date;
	createdAt?: Date;
}
class Examresult
	extends Model<ExamresultAttributes>
	implements ExamresultAttributes
{
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public examId!: Identifier;
	public userId!: Identifier;
	public questions!: JSON;
	public answers!: JSON;
	public score!: number;
	public startTime!: Date;
	public endTime!: Date;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Examresult.belongsTo(models.Exam, {
			foreignKey: "examId",
			targetKey: "id",
			as: "exams",
		});
		Examresult.belongsTo(models.User, {
			foreignKey: "userId",
			targetKey: "id",
			as: "users",
		});
	}
}
Examresult.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		examId: DataTypes.UUID,
		userId: DataTypes.UUID,
		questions: DataTypes.JSON,
		answers: DataTypes.JSON,
		score: DataTypes.INTEGER,
		startTime: DataTypes.DATE,
		endTime: DataTypes.DATE,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Examresult",
	}
);

export default Examresult;
