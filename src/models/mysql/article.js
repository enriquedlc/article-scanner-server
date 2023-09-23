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
		const query =
			"SELECT BIN_TO_UUID(id) AS id, articleName, barcode, exhibition, shelf, warehouse, createdAt, updatedAt, BIN_TO_UUID(categoryId) as categoryId FROM articles";

		const [articles] = await connection.query(query);

		if (createdAt) {
			return articles.filter(
				(article) =>
					new Date(article.createdAt).toISOString() >=
					new Date(articles[3].createdAt).toISOString(),
			);
		}

		return articles;
	}

	static async getById({ id }) {
		const query =
			"SELECT BIN_TO_UUID(id) AS id, articleName, barcode, exhibition, shelf, warehouse, createdAt, updatedAt, BIN_TO_UUID(categoryId) as categoryId FROM articles WHERE id = UUID_TO_BIN(?)";
		const [result] = await connection.query(query, [id]);
		console.log(result[0]);
		return result[0];
	}

	static async create({ article }) {
		const uuidResult = await connection.query("SELECT UUID() uuid");

		const articleCategoryQuery =
			"SELECT BIN_TO_UUID(id) AS id FROM categories WHERE categoryName = ?";
		const [categoryResult] = await connection.query(articleCategoryQuery, [
			article.category.categoryName,
		]);

		console.log(categoryResult[0].id);

		const query =
			"INSERT INTO articles (id, articleName, barcode, exhibition, shelf, warehouse, categoryId) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, UUID_TO_BIN(?))";
		const [result] = await connection.query(query, [
			uuidResult[0][0].uuid,
			article.articleName,
			article.barcode,
			article.exhibition,
			article.shelf,
			article.warehouse,
			categoryResult[0].id,
		]);

		if (result.affectedRows === 1) {
			const article = await this.getById({ id: uuidResult[0][0].uuid });
			return article;
		}
	}

	static async delete(id) {
		const query = "DELETE FROM articles WHERE id = UUID_TO_BIN(?)";
		const [result] = await connection.query(query, [id]);
		return result.affectedRows === 1;
	}

	static async update({ id, article }) {
		const articleCategoryQuery =
			"SELECT BIN_TO_UUID(id) AS id FROM categories WHERE categoryName = ?";
		const [categoryResult] = await connection.query(articleCategoryQuery, [
			article.category.categoryName,
		]);

		console.log(article.category.categoryName);

		console.log(categoryResult[0].id);

		const query =
			"UPDATE articles SET articleName = ?, barcode = ?, exhibition = ?, shelf = ?, warehouse = ?, updatedAt = ?, categoryId = UUID_TO_BIN(?) WHERE id = UUID_TO_BIN(?)";
		const [result] = await connection.query(query, [
			article.articleName,
			article.barcode,
			article.exhibition,
			article.shelf,
			article.warehouse,
			new Date(),
			categoryResult[0].id,
			id,
		]);

		if (result.affectedRows === 1) {
			return await this.getById({ id });
		}
	}

	static async getArticlesByUser({ userId }) {
		const query = `
			SELECT
				BIN_TO_UUID(a.id) AS id,
				a.articleName,
				a.barcode,
				a.exhibition,
				a.shelf,
				a.warehouse,
				a.createdAt,
				a.updatedAt,
				c.categoryName
			FROM
				articles a
				JOIN user_articles ua ON a.id = ua.article_id
				JOIN users u ON ua.user_id = u.id
				JOIN categories c ON a.categoryId = c.id
			WHERE
				u.id = UUID_TO_BIN(?);`;

		const [result] = await connection.query(query, [userId]);

		return result;
	}

	static async createArticleForUser({ userId, article }) {
		const createdArticle = await this.create({ article });

		if (createdArticle) {
			const query =
				"INSERT INTO user_articles (user_id, article_id) VALUES (?, UUID_TO_BIN(?))";
			const [result] = await connection.query(query, [
				userId,
				createdArticle.id,
			]);

			if (result.affectedRows === 1) {
				return true;
			}
		}

		return false;
	}
}
