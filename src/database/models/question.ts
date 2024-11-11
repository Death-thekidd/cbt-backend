import {
	Model,
	DataTypes,
	Identifier,
	EnumDataType,
	BelongsToManyAddAssociationsMixinOptions,
	BelongsToManyAddAssociationMixinOptions,
	BelongsToManyGetAssociationsMixinOptions,
} from "sequelize";
import sequelizeConnection from "../connection";
import Course from "./course";
import Option, { OptionAttributes } from "./option";
import Answer from "./answer";

export interface QuestionAttributes {
	id?: Identifier;
	name: string;
	text: string;
	topic: string;
	score: number;
	type: string;
	courseId: Identifier;

	updatedAt?: Date;
	createdAt?: Date;
}
class Question extends Model<QuestionAttributes> implements QuestionAttributes {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	public id!: Identifier;
	public name!: string;
	public text!: string;
	public topic!: string;
	public score!: number;
	public type!: string;
	public courseId!: Identifier;
	public readonly updatedAt!: Date;
	public readonly createdAt!: Date;
	addOptions: (
		optionsData: Option[],
		options?: BelongsToManyAddAssociationsMixinOptions
	) => Promise<Question[]>;
	addOption: (
		optionData: Option,
		options?: BelongsToManyAddAssociationMixinOptions
	) => Promise<Question>;
	removeOption: (optionData: Option) => Promise<Option[]>;
	getOptions: (
		options?: BelongsToManyGetAssociationsMixinOptions
	) => Promise<Option[]>;

	addAnswers: (
		answers: Answer[],
		options?: BelongsToManyAddAssociationsMixinOptions
	) => Promise<Answer[]>;
	addAnswer: (
		answer: Answer,
		options?: BelongsToManyAddAssociationMixinOptions
	) => Promise<Answer>;
	removeAnswer: (answer: Answer) => Promise<Answer[]>;
	getAnswers: (
		options?: BelongsToManyGetAssociationsMixinOptions
	) => Promise<Answer[]>;

	static associate(models: any) {
		Question.belongsTo(models.Course, {
			foreignKey: "courseId",
			targetKey: "id",
			as: "course",
		});
		Question.belongsToMany(models?.Exam, {
			through: "Examquestions",
			foreignKey: "questionId",
			as: "exams",
		});
		Question.belongsToMany(models?.Option, {
			through: "Questionoptions",
			foreignKey: "questionId",
			as: "options",
		});
		Question.belongsToMany(models?.Answer, {
			through: "Questionanswers",
			foreignKey: "questionId",
			as: "answers",
		});
	}
}
Question.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			autoIncrement: false,
		},
		name: DataTypes.STRING,
		type: DataTypes.ENUM("MCQ", "Medical"),
		text: DataTypes.TEXT,
		topic: DataTypes.TEXT,
		score: DataTypes.FLOAT,
		courseId: DataTypes.UUIDV4,
	},
	{
		sequelize: sequelizeConnection,
		modelName: "Question",
	}
);

export default Question;
