import {
	validateArticle,
	validatePartialArticle,
} from "../schemas/articles.js";

// TODO: from the controller, we would call others models
// for example the user that created the article

// TODO: the articles should be paginated

// TODO: the article should belong to a category

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

		console.log(req.body);

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		const newArticle = await this.articleModel.create({ article: result.data });

		res.status(201).json({
			message: "Article created successfully",
			article: newArticle,
		});
	};

	update = async (req, res) => {
		const { id } = req.params;
		const result = validatePartialArticle(req.body);

		if (!result.success)
			return res
				.status(400)
				.json({ message: JSON.parse(result.error.message) });

		console.log(result.data);

		const updatedArticle = await this.articleModel.update({
			id,
			article: result.data,
		});

		res.json({ message: "Article updated sucessfully", data: updatedArticle });
	};

	delete = async (req, res) => {
		const { id } = req.params;
		const result = await this.articleModel.delete(id);

		if (!result) return res.status(404).json({ message: "Article not found" });

		return res.json({ message: "Article deleted" });
	};
}
