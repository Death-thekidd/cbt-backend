import {
	Model,
	DataTypes,
	Identifier,
	BelongsToManyGetAssociationsMixinOptions,
	BelongsToManyAddAssociationsMixinOptions,
	BelongsToManyAddAssociationMixinOptions,
} from "sequelize";
import sequelizeConnection from "../connection";
import Answer from "./answer";

export interface OptionAttributes {
	id?: Identifier;
	text: string;
	isCorrect: boolean;
	// optionScore: number;
	questionId: Identifier;
	updatedAt?: Date;
	createdAt?: Date;
}
class Option extends Model<OptionAttributes> implements OptionAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public text!: string;
	public isCorrect!: boolean;
	// public optionScore!: number;
	public questionId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;
	addAnswers: (
		answers: Answer[],
		options?: BelongsToManyAddAssociationsMixinOptions
	) => Promise<Answer[]>;
	addAnswer: (
		answer: Answer,
		options?: BelongsToManyAddAssociationMixinOptions
	) => Promise<Answer>;
	removeAnswer: (answer: Answer) => Promise<Answer[]>;
	Answers: Answer[];
	getAnswers: (
		options?: BelongsToManyGetAssociationsMixinOptions
	) => Promise<Answer[]>;

	static associate(models: any) {
		Option.belongsTo(models.Exam, {
			foreignKey: "questionId",
			targetKey: "id",
			as: "exams",
		});
		Option.belongsToMany(models?.Answer, {
			through: "Optionanswers",
			foreignKey: "optionId",
			as: "answers",
		});
		Option.belongsToMany(models?.Question, {
			through: "Questionoptions",
			foreignKey: "optionId",
			as: "questions",
		});
	}
}
Option.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		text: DataTypes.STRING,
		isCorrect: DataTypes.BOOLEAN,
		// optionScore: DataTypes.FLOAT,
		questionId: DataTypes.UUID,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Option",
	}
);

export default Option;
