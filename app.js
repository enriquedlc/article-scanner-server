const express = require("express"); // TODO: convert to ES modules
const crypto = require("node:crypto");

const articles = require("./data/articles.json");

const validateArticle = require("./src/schemas/articles");

const app = express();

app.use(express.json());
app.disable("x-powered-by");

app.get("/", (_, res) => {
	res.json({ message: "Hello World!" });
});

app.get("/articles", (req, res) => {
	const { createdAt } = req.query;

	if (createdAt) {
		const filteredArticles = articles.filter(
			(article) => article.createdAt >= createdAt,
		);
		return res.json(filteredArticles);
	}

	res.json(articles);
});

app.get("/articles/:id", (req, res) => {
	const { id } = req.params;
	const article = articles.find((article) => article.id === id);

	if (article) return res.json(article);

	res.status(404).json({ message: "Article not found" });
});

// POST
app.post("/articles", (req, res) => {
	const result = validateArticle(req.body);

	if (!result.success) {
		return res.status(400).json({ message: JSON.parse(result.error.message) });
	}

	const newArticle = {
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
		...result.data,
	};

	articles.push(newArticle);

	res.status(201).json(newArticle);
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
