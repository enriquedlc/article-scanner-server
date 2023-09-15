import mysql from "mysql2/promise";

const configuration = {
	host: "localhost",
	user: "root",
	port: 3306,
	password: "1234",
	database: "articlescanner",
};

const connection = await mysql.createConnection(configuration);

export class ArticleModel {
	static async getAll({ createdAt }) {
		if (createdAt) {
			const [articles] = await connection.query(
				"SELECT articleName, barcode, exhibition, shelf, warehouse, createdAt, updatedAt, BIN_TO_UUID(id) AS id FROM articles WHERE createdAt >= ?;",
				[createdAt],
			);

			return articles;
		}

		const [articles] = await connection.query(
			"SELECT articleName, barcode, exhibition, shelf, warehouse, createdAt, updatedAt, BIN_TO_UUID(id) AS id FROM articles;",
		);

		return articles;
	}

	static async getById({ id }) {}

	static async create({ article }) {}

	static async delete(id) {}

	static async update({ id, article }) {}
}
