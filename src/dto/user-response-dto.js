import { validateUser } from "../schemas/users.js";

export const userToResponseDTO = (user) => {
	if (!validateUser(user)) return;
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
