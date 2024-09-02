import { Model, DataTypes, Identifier } from "sequelize";
import sequelizeConnection from "../connection";

export interface ExamAttributes {
	id?: Identifier;
	name: string;
	sessionId: Identifier;
	courseId: Identifier;
	examtypeId: Identifier;
	startDate: Date;
	endDate: Date;
	duration: string;
	instruction: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class Exam extends Model<ExamAttributes> implements ExamAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public sessionId!: Identifier;
	public courseId!: Identifier;
	public examtypeId!: Identifier;
	public startDate!: Date;
	public endDate!: Date;
	public duration!: string;
	public instruction!: string;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	static associate(models: any) {
		Exam.belongsTo(models.Course, {
			foreignKey: "courseId",
			targetKey: "id",
			as: "courses",
		});
		Exam.belongsTo(models.Session, {
			foreignKey: "sessionId",
			targetKey: "id",
			as: "sessions",
		});
	}
}
Exam.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
		sessionId: DataTypes.UUID,
		courseId: DataTypes.UUID,
		examtypeId: DataTypes.UUID,
		startDate: DataTypes.DATE,
		endDate: DataTypes.DATE,
		duration: DataTypes.STRING,
		instruction: DataTypes.STRING,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Exam",
	}
);

export default Exam;
