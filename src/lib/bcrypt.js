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

export const comparePassword = async (password, hashedPassword) => {
	try {
		return bcrypt.compare(password, hashedPassword);
	} catch (error) {
		console.log(error);
	}
};
