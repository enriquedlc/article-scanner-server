import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const encryptPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		return bcrypt.hash(password, salt);
	} catch (error) {
		console.log(error);
	}
};
