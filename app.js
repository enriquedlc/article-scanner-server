const express = require("express"); // TODO: convert to ES modules

const articles = require("./data/articles.json");

const app = express();

app.disable("x-powered-by");

app.get("/", (_, res) => {
	res.json({ message: "Hello World!" });
});

app.get("/articles", (req, res) => {
	console.log(req.query);
	console.log("pene");
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

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
