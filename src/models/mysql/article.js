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
		let query =
			"SELECT articleName, barcode, exhibition, shelf, warehouse, createdAt, updatedAt, BIN_TO_UUID(id) AS id FROM articles";

		if (createdAt) {
			query += " WHERE createdAt >= ?";
			const [articles] = await connection.query(query, [createdAt]);
			return articles;
		}

		const [articles] = await connection.query(query);
		return articles;
	}

	static async getById({ id }) {
		const query =
			"SELECT articleName, barcode, exhibition, shelf, warehouse, createdAt, updatedAt, BIN_TO_UUID(id) AS id FROM articles WHERE id = UUID_TO_BIN(?)";
		const [article] = await connection.query(query, [id]);
		return article;
	}

	static async create({ article }) {
		const query =
			"INSERT INTO articles (articleName, barcode, exhibition, shelf, warehouse) VALUES (?, ?, ?, ?, ?)";
		const [result] = await connection.query(query, [
			article.articleName,
			article.barcode,
			article.exhibition,
			article.shelf,
			article.warehouse,
		]);

		return result.affectedRows === 1;
	}

	static async delete(id) {
		const query = "DELETE FROM articles WHERE id = UUID_TO_BIN(?)";
		const [result] = await connection.query(query, [id]);
		return result.affectedRows === 1;
	}

	static async update({ id, article }) {
		const query =
			"UPDATE articles SET articleName = ?, barcode = ?, exhibition = ?, shelf = ?, warehouse = ?, updatedAt = ? WHERE id = UUID_TO_BIN(?)";
		const [result] = await connection.query(query, [
			article.articleName,
			article.barcode,
			article.exhibition,
			article.shelf,
			article.warehouse,
			new Date(),
			id,
		]);

		if (result.affectedRows === 1) {
			return await this.getById({ id });
		}
	}
}
