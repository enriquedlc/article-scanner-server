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
			"SELECT BIN_TO_UUID(id) as id, username, email, createdAt, updatedAt, password FROM users WHERE id = UUID_TO_BIN(?);";
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
		const query = "DELETE FROM users WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [id]);
		return result.affectedRows === 1;
	}

	static async update({ id, user }) {
		const query =
			"UPDATE users SET username = ?, password = ?, email = ?, updatedAt = ? WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [
			user.username,
			await encryptPassword(user.password),
			user.email,
			new Date(),
			id,
		]);

		if (result.affectedRows === 1) {
			const user = await this.getById({ id });
			return userToResponseDTO(user);
		}
	}

	static async login({ username, password }) {
		const query =
			"SELECT BIN_TO_UUID(id) as id, username, password, createdAt, updatedAt, email FROM users WHERE username = ?;";
		const [result] = await connection.query(query, [username]);

		if (result.length === 0) {
			return null;
		}

		const user = result[0];

		const isPasswordValid = await comparePassword(password, user.password);

		if (!isPasswordValid) {
			return null;
		}

		return user;
	}

	static async patchUsername({ id, username }) {
		const query = "UPDATE users SET username = ?, updatedAt = ? WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [username, new Date(), id]);

		if (result.affectedRows === 1) {
			const user = await this.getById({ id });
			return userToResponseDTO(user);
		}
	}

	static async patchPassword({ id, password }) {
		const query = "UPDATE users SET password = ?, updatedAt = ? WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [
			await encryptPassword(password),
			new Date(),
			id,
		]);

		if (result.affectedRows === 1) {
			const user = await this.getById({ id });
			return user;
		}
	}

	static async patchEmail({ id, email }) {
		const query = "UPDATE users SET email = ?, updatedAt = ? WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [email, new Date(), id]);

		if (result.affectedRows === 1) {
			const user = await this.getById({ id });
			return userToResponseDTO(user);
		}
	}
}
