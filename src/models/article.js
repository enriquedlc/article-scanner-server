import { readJSON } from "../utils/read-json.js";

const articles = readJSON("../../data/articles.json");

export class ArticleModel {
	static async getAll({ createdAt }) {
		if (createdAt) {
			return articles.filter((article) => article.createdAt >= createdAt);
		}

		return articles;
	}
}
