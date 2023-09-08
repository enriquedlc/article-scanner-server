import { randomUUID } from "node:crypto";

import { readJSON } from "@utils/read-json.js";

const users = readJSON("@data/users.json");

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
			createdAt: new Date(),
			updatedAt: new Date(),
			...user,
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
			updatedAt: new Date(),
		};

		users[userIndex] = updatedUser;

		return updatedUser;
	}
}
