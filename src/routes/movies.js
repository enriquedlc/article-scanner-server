import { Router } from "express";

import {
	validateArticle,
	validatePartialArticle,
} from "../schemas/articles.js";

import { ArticleModel } from "../models/article.js";

export const articlesRouter = Router();

articlesRouter.get("/", async (req, res) => {
	const { createdAt } = req.query;

	const articles = await ArticleModel.getAll({ createdAt });

	res.json(articles);
});

articlesRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const article = await ArticleModel.getById(id);

	if (article) return res.json(article);

	res.status(404).json({ message: "Article not found" });
});

articlesRouter.post("/", async (req, res) => {
	const result = validateArticle(req.body);

	if (!result.success)
		return res.status(400).json({ message: JSON.parse(result.error.message) });

	const newArticle = await ArticleModel.create({ article: result.data });

	res.status(201).json(newArticle);
});

articlesRouter.put("/:id", async (req, res) => {
	const { id } = req.params;
	const result = validatePartialArticle(req.body);

	if (!result.success)
		return res.status(400).json({ message: JSON.parse(result.error.message) });

	const updatedArticle = await ArticleModel.update({
		id,
		article: result.data,
	});

	res.json(updatedArticle);
});

articlesRouter.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const result = await ArticleModel.delete(id);

	if (result === false)
		return res.status(404).json({ message: "Article not found" });

	res.status(204).send({
		message: "Article deleted",
	});
});
