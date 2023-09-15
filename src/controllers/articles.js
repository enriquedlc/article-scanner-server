// import { ArticleModel } from "../models/local-fs/article.js";
import { ArticleModel } from "../models/mysql/article.js";

import {
	validateArticle,
	validatePartialArticle,
} from "../schemas/articles.js";

// TODO: from the controller, we would call others models
// for example the user that created the article

export class ArticleController {
	static async getAll(req, res) {
		const { createdAt } = req.query;

		const articles = await ArticleModel.getAll({ createdAt });

		res.json(articles);
	}

	static async getById(req, res) {
		const { id } = req.params;
		const article = await ArticleModel.getById(id);

		if (article) return res.json(article);

		res.status(404).json({ message: "Article not found" });
	}

	static async craete(req, res) {
		const result = validateArticle(req.body);

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const newArticle = await ArticleModel.create({ article: result.data });

		res.status(201).json(newArticle);
	}

	static async update(req, res) {
		const { id } = req.params;
		const result = validatePartialArticle(req.body);

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const updatedArticle = await ArticleModel.update({
			id,
			article: result.data,
		});

		res.json(updatedArticle);
	}

	static async delete(req, res) {
		const { id } = req.params;
		const result = await ArticleModel.delete(id);

		if (result === false)
			return res.status(404).json({ message: "Article not found" });

		res.status(204).send({
			message: "Article deleted",
		});
	}
}
