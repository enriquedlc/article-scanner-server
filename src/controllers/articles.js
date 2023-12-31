import { validateArticle, validatePartialArticle } from "../schemas/articles.js";

// TODO: the articles should be paginated

export class ArticleController {
	constructor({ articleModel }) {
		this.articleModel = articleModel;
	}

	getAll = async (req, res) => {
		const { createdAt } = req.query;

		const articles = await this.articleModel.getAll({ createdAt });

		res.json(articles);
	};

	getById = async (req, res) => {
		const { id } = req.params;
		const article = await this.articleModel.getById({ id });

		if (article) return res.json(article);

		res.status(404).json({ message: "Article not found" });
	};

	create = async (req, res) => {
		const result = validateArticle(req.body);

		if (!result.success)
			return res.status(400).json({ message: JSON.parse(result.error.message) });

		const { createdArticle, created } = await this.articleModel.create({
			article: result.data,
		});

		return res.json({
			message: "Article created successfully",
			createdArticle,
			created,
		});
	};

	update = async (req, res) => {
		const { id } = req.params;
		const result = validatePartialArticle(req.body);

		if (!result.success)
			return res.status(400).json({ message: JSON.parse(result.error.message) });

		const updatedArticle = await this.articleModel.update({
			id,
			article: result.data,
		});

		if (!updatedArticle) return res.status(404).json({ message: "Article not found" });

		res.json({ updated: true, message: "Article updated sucessfully", data: updatedArticle });
	};

	delete = async (req, res) => {
		const { id } = req.params;
		const result = await this.articleModel.delete(id);

		if (!result) return res.status(404).json({ message: "Article not found" });

		return res.json({ deleted: result, message: "Article deleted" });
	};

	getArticlesByUser = async (req, res) => {
		const { userId } = req.params;
		const articles = await this.articleModel.getArticlesByUser({
			userId,
		});

		res.json({
			message: "Articles fetched successfully",
			articles,
		});
	};

	createArticleForUser = async (req, res) => {
		const userId = req.body.userId;

		if (!userId) return res.status(400).json({ message: "userId is required" });

		const result = validateArticle(req.body.article);

		if (!result.success) {
			return res.status(400).json({ message: JSON.parse(result.error.message) });
		}

		const newArticle = await this.articleModel.createArticleForUser({
			userId,
			article: result.data,
		});

		res.status(201).json({
			message: "Article created successfully",
			created: true,
			article: newArticle,
		});
	};
}
