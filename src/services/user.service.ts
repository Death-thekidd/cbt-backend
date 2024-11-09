import { User } from "../database/models";
import { Identifier, Op, col } from "sequelize";
import on from "../lib/on";

const getAllUsers = async () => {
	try {
		return User.findAll();
	} catch (error) {
		throw error;
	}
};

const getUser = async (id: Identifier) => {
	try {
		const userObj = await User.findOne({
			where: {
				id: { [Op.eq]: id },
			},
		});

		return userObj;
	} catch (error) {
		throw error;
	}
};

const getUserByEmail = async (email: string) => {
	const [err, userObj] = await on(
		User.findOne({
			where: { email: { [Op.eq]: email } },
		})
	);

	if (err) throw err;

	return userObj;
};

const createUser = async (hash: string, data: any) => {
	try {
		const userObj = await User.create({
			...data,
			password: hash,
		});

		return userObj;
	} catch (error) {
		throw error;
	}
};

const updateUserByEmail = async (email: string, updateData: any) => {
	try {
		// Not secure as anything could be updated
		return await User.update(updateData, {
			where: { email: { [Op.eq]: email } },
		});
	} catch (error) {
		throw error;
	}
};

const updateUserById = async (
	userId: Identifier,
	password: string,
	updateData: any
) => {
	try {
		// Not secure as anything could be updated
		return await User.update(
			{
				password: password,
				...updateData,
			},
			{
				where: { id: { [Op.eq]: userId } },
			}
		);
	} catch (error) {
		throw error;
	}
};

/**
 * Delete Users
 */
const deleteUser = async (data: any) => {
	try {
		return await User.destroy({
			where: {
				id: data, //?  data.materialId: matID
			},
		});
	} catch (err) {
		throw err;
	}
};

export default {
	getAllUsers,
	getUser,
	getUserByEmail,
	createUser,
	updateUserByEmail,
	updateUserById,
	deleteUser,
};
