import { randomUUID } from "node:crypto";

import { readJSON } from "../../utils/read-json.js";

const articles = readJSON("../data/articles.json");

export class ArticleModel {
	static async getAll({ createdAt }) {
		if (createdAt) {
			return articles.filter((article) => article.createdAt >= createdAt);
		}

		return articles;
	}

	static async getById(id) {
		return articles.find((article) => article.id === id);
	}

	static async create({ article }) {
		const newArticle = {
			id: randomUUID(),
			createdAt: new Date(),
			updatedAt: new Date(),
			...article,
		};

		articles.push(newArticle);

		return newArticle;
	}

	static async delete(id) {
		const articleIndex = articles.findIndex((article) => article.id === id);

		if (articleIndex === -1) return false;

		articles.splice(articleIndex, 1);

		return true;
	}

	static async update({ id, article }) {
		const articleIndex = articles.findIndex((article) => article.id === id);

		if (articleIndex === -1) return false;

		const updatedArticle = {
			...articles[articleIndex],
			...article,
			updatedAt: new Date(),
		};

		articles[articleIndex] = updatedArticle;

		return updatedArticle;
	}
}
