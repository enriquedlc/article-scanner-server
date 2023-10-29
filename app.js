import cors from "cors";
import express, { json } from "express";

import { createArticleRouter } from "./src/routes/articles.js";
import { createUserRouter } from "./src/routes/users.js";
import { createCategoryRouter } from "./src/routes/categories.js";

export const createServerApp = ({ articleModel, userModel, categoryModel }) => {
	const app = express();

	app.disable("x-powered-by");

	app.use(cors());
	app.use(json());

	app.use("/articles", createArticleRouter({ articleModel }));
	app.use("/users", createUserRouter({ userModel }));
	app.use("/categories", createCategoryRouter({ categoryModel }));

	const PORT = process.env.PORT ?? 1234;

	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
};
