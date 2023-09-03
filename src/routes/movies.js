import { Router } from "express";
import { randomUUID } from "node:crypto";

import {
	validateArticle,
	validatePartialArticle,
} from "../schemas/articles.js";

import { ArticleModel } from "../models/article.js";
import { readJSON } from "../utils/read-json.js";

const articles = readJSON("../../data/articles.json");

export const articlesRouter = Router();

articlesRouter.get("/", async (req, res) => {
	const { createdAt } = req.query;

	const articles = await ArticleModel.getAll({ createdAt });

	res.json(articles);
});

articlesRouter.get("/:id", (req, res) => {
	const { id } = req.params;
	const article = articles.find((article) => article.id === id);

	if (article) return res.json(article);

	res.status(404).json({ message: "Article not found" });
});

articlesRouter.post("/", (req, res) => {
	const result = validateArticle(req.body);

	if (!result.success) {
		return res.status(400).json({ message: JSON.parse(result.error.message) });
	}

	const newArticle = {
		id: randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
		...result.data,
	};

	articles.push(newArticle);

	res.status(201).json(newArticle);
});

articlesRouter.put("/:id", (req, res) => {
	const { id } = req.params;
	const result = validatePartialArticle(req.body);
	const articleIndex = articles.findIndex((article) => article.id === id);

	if (articleIndex === -1)
		return res.status(404).json({ message: "Article not found" });

	if (!result.success)
		return res.status(400).json({ message: JSON.parse(result.error.message) });

	const updatedArticle = {
		...articles[articleIndex],
		...result.data,
		updatedAt: new Date(),
	};

	articles[articleIndex] = updatedArticle;

	res.json(updatedArticle);
});

articlesRouter.delete("/:id", (req, res) => {
	const { id } = req.params;
	const articleIndex = articles.findIndex((article) => article.id === id);

	if (articleIndex === -1)
		return res.status(404).json({ message: "Article not found" });

	articles.splice(articleIndex, 1);

	res.status(204).send({
		message: "Article deleted",
	});
});
