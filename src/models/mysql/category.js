import mysql from "mysql2/promise";

const configuration = {
	host: "localhost",
	user: "root",
	port: 3306,
	password: "1234",
	database: "articlescanner",
};

const connection = await mysql.createConnection(configuration);

export class CategoryModel {
	static async getAll() {
		const query = "SELECT BIN_TO_UUID(id) as id, categoryName FROM categories;";
		const [result] = await connection.query(query);
		return result;
	}

	static async getById({ id }) {
		const query =
			"SELECT BIN_TO_UUID(id) as id, categoryName FROM categories WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [id]);
		return result[0];
	}

	static async create({ category }) {
		const uuidResult = await connection.query("SELECT UUID() uuid");

		const query = "INSERT INTO categories (id, categoryName) VALUES (UUID_TO_BIN(?), ?);";
		const [result] = await connection.query(query, [
			uuidResult[0][0].uuid,
			category.categoryName,
		]);

		if (result.affectedRows === 1) {
			const category = await this.getById({ id: uuidResult[0][0].uuid });
			return category;
		}
	}

	static async delete(id) {
		const query = "DELETE FROM categories WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [id]);
		return result.affectedRows === 1;
	}

	static async update({ id, category }) {
		const query = "UPDATE categories SET categoryName = ? WHERE id = UUID_TO_BIN(?);";
		const [result] = await connection.query(query, [category.categoryName, id]);
		if (result.affectedRows === 1) {
			return await this.getById({ id });
		}
	}
}
