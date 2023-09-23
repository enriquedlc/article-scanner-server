import { validatePartialUser, validateUser } from "../schemas/users.js";

// TODO: try catch all methods in controllers?

export class UserController {
	constructor({ userModel }) {
		this.userModel = userModel;
	}

	getAll = async (_, res) => {
		const users = await this.userModel.getAll();

		res.json(users);
	};

	getById = async (req, res) => {
		const { id } = req.params;
		const user = await this.userModel.getById({ id });

		if (user) return res.json(user);

		res.status(404).json({ message: "User not found" });
	};

	create = async (req, res) => {
		const result = validateUser(req.body);

		if (!result.success) return res.status(400).json({ message: result.error });

		const newUser = await this.userModel.create({ user: result.data });

		res.status(201).json(newUser);
	};

	update = async (req, res) => {
		const { id } = req.params;
		const result = validateUser(req.body);

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const updatedUser = await this.userModel.update({ id, user: result.data });

		if (!updatedUser)
			return res.status(404).json({ message: "User not found" });

		res.json({
			message: "User updated successfully",
			user: updatedUser,
		});
	};

	delete = async (req, res) => {
		const { id } = req.params;

		const deleted = await this.userModel.delete(id);

		if (deleted) return res.json({ message: "User deleted" });

		res.status(404).json({ message: "User not found" });
	};

	login = async (req, res) => {
		const { username, password } = req.body;

		const result = validatePartialUser({ username, password });

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const user = await this.userModel.login({ username, password });

		if (!user)
			return res
				.status(401)
				.json({ message: "Invalid credentials", login: false, user: null });

		res.json({ message: "Logged in", login: true, user: user });
	};

	updateUsername = async (req, res) => {
		const { id } = req.params;
		const { username } = req.body;

		const result = validatePartialUser({ username });

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const updatedUser = await this.userModel.patchUsername({ id, username });

		if (!updatedUser)
			return res.status(404).json({ message: "User not found" });

		res.json({
			message: "Username updated successfully",
			user: updatedUser,
		});
	};

	updatePassword = async (req, res) => {
		const { id } = req.params;
		const { password } = req.body;

		const result = validatePartialUser({ password });

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const updatedUser = await this.userModel.patchPassword({ id, password });

		if (!updatedUser)
			return res.status(404).json({ message: "User not found" });

		res.json({
			message: "Password updated successfully",
			user: updatedUser,
		});
	};
}
