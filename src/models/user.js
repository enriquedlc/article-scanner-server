import { randomUUID } from "node:crypto";

import { encryptPassword } from "../lib/bcrypt.js";
import { readJSON } from "../utils/read-json.js";

const users = readJSON("../data/users.json");

export class UserModel {
	static async getAll() {
		return users;
	}

	static async getById(id) {
		return users.find((user) => user.id === id);
	}

	static async create({ user }) {
		const newUser = {
			id: randomUUID(),
			...user,
			password: await encryptPassword(user.password),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		users.push(newUser);

		return newUser;
	}

	static async delete(id) {
		const userIndex = users.findIndex((user) => user.id === id);

		if (userIndex === -1) return false;

		users.splice(userIndex, 1);

		return true;
	}

	static async update({ id, user }) {
		const userIndex = users.findIndex((user) => user.id === id);

		if (userIndex === -1) return false;

		const updatedUser = {
			...users[userIndex],
			...user,
			password: await encryptPassword(user.password),
			updatedAt: new Date(),
		};

		users[userIndex] = updatedUser;

		return updatedUser;
	}

	// TODO: patch user username
	// TODO: patch user password
	// TODO: patch user email
}
