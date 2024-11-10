import {
	Model,
	DataTypes,
	Identifier,
	BelongsToManyAddAssociationsMixinOptions,
	BelongsToManyAddAssociationMixinOptions,
	BelongsToManyGetAssociationsMixinOptions,
} from "sequelize";
import sequelizeConnection from "../connection";
import Exam from "./exam";

export interface UserAttributes {
	id?: Identifier;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	// matricNo: string;
	canLogin: boolean;
	phone: string;
	gender: string;
	idNumber: string;
	picUrl: string;
	updatedAt?: Date;
	createdAt?: Date;
}
class User extends Model<UserAttributes> implements UserAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public firstName!: string;
	public lastName!: string;
	public email!: string;
	public password!: string;
	public role!: string;
	// public matricNo!: string;
	public canLogin!: boolean;
	public phone!: string;
	public gender!: string;
	public idNumber!: string;
	public picUrl!: string;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;

	addExams: (
		exams: Exam[],
		options?: BelongsToManyAddAssociationsMixinOptions
	) => Promise<Exam[]>;
	addExam: (
		exam: Exam,
		options?: BelongsToManyAddAssociationMixinOptions
	) => Promise<User>;
	removeExam: (student: User) => Promise<Exam[]>;
	Exams: Exam[];
	getExams: (
		exams?: BelongsToManyGetAssociationsMixinOptions
	) => Promise<Exam[]>;

	static associate(models: any) {
		User.belongsToMany(models?.Exam, {
			through: "Examstudents",
			foreignKey: "studentId",
			as: "exams",
		});
		User.belongsToMany(models.Result, {
			foreignKey: "studentId",
			through: "Studentresults",
			as: "results",
		});
	}
}
User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: DataTypes.STRING,
		role: DataTypes.STRING,
		// matricNo: DataTypes.STRING,
		canLogin: DataTypes.BOOLEAN,
		phone: DataTypes.STRING,
		gender: DataTypes.STRING,
		idNumber: DataTypes.STRING,
		picUrl: DataTypes.TEXT,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "User",
	}
);

export default User;
