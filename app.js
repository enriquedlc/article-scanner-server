import cors from "cors";
import express, { json } from "express";

import { createArticleRouter } from "./src/routes/articles.js";
import { createUserRouter } from "./src/routes/users.js";

export const createServerApp = ({ articleModel, userModel }) => {
	const app = express();

	app.disable("x-powered-by");

	app.use(cors());
	app.use(json());

	app.use("/articles", createArticleRouter({ articleModel }));
	app.use("/users", createUserRouter({ userModel }));

	const PORT = process.env.PORT || 1234;

	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
};
