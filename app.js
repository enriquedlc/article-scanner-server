import cors from "cors";
import express, { json } from "express";

import { articlesRouter } from "./src/routes/articles.js";

const app = express();

app.disable("x-powered-by");

app.use(json());
app.use(cors());

// app.get("/", (_, res) => {
// 	res.json({ message: "Article scanner server 📦" });
// });

app.use("/articles", articlesRouter);

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
