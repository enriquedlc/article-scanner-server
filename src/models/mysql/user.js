import mysql from "mysql2/promise";

import { userToResponseDTO } from "../../dto/user-response-dto.js";
import { comparePassword, encryptPassword } from "../../lib/bcrypt.js";

const configuration = {
	host: "localhost",
	user: "root",
	port: 3306,
	password: "1234",
	database: "articlescanner",
};

const connection = await mysql.createConnection(configuration);

export class UserModel {
	static async getAll() {
		const query =
			"SELECT BIN_TO_UUID(id) as id, username, email, createdAt, updatedAt FROM users;";
		const [result] = await connection.query(query);
		return result;
	}

	static async getById({ id }) {
		const query =
			"SELECT BIN_TO_UUID(id) as id, username, email, createdAt, updatedAt FROM users WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [id]);
		return result[0];
	}

	static async create({ user }) {
		const uuidResult = await connection.query("SELECT UUID() uuid");

		const query =
			"INSERT INTO users (id, username, password, email) VALUES (UUID_TO_BIN(?), ?, ?, ?);";
		const [result] = await connection.query(query, [
			uuidResult[0][0].uuid,
			user.username,
			await encryptPassword(user.password),
			user.email,
		]);

		if (result.affectedRows === 1) {
			const user = await this.getById({ id: uuidResult[0][0].uuid });
			return userToResponseDTO(user);
		}
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

	static async login({ username, password }) {
		const user = users.find((user) => user.username === username);

		if (!user) return false;

		const isValidPassword = await comparePassword(password, user.password);

		if (!isValidPassword) return false;

		return user;
	}
	// TODO: patch user username
	// TODO: patch user password
	// TODO: patch user email
}
