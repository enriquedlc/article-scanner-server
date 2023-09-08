import { UserModel } from "@models/user";

import { validatePartialUser, validateUser } from "@schemas/users";

export class UserController {
	static async getAll(_, res) {
		const users = await UserModel.getAll();

		res.json(users);
	}

	static async getById(req, res) {
		const { id } = req.params;
		const user = await UserModel.getById(id);

		if (user) return res.json(user);

		res.status(404).json({ message: "User not found" });
	}

	static async create(req, res) {
		const result = validateUser(req.body);

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const newUser = await UserModel.create({ user: result.data });

		res.status(201).json(newUser);
	}

	static async update(req, res) {
		const { id } = req.params;
		const result = validatePartialUser(req.body);

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const updatedUser = await UserModel.update({ id, user: result.data });

		res.json(updatedUser);
	}

	static async delete(req, res) {
		const { id } = req.params;

		const deleted = await UserModel.delete(id);

		if (deleted) return res.json({ message: "User deleted" });

		res.status(404).json({ message: "User not found" });
	}
}