import { Router } from "express";

import { ArticleController } from "../controllers/articles.js";

export const createArticleRouter = ({ articleModel }) => {
	const articlesRouter = Router();

	const articleController = new ArticleController({ articleModel });

	articlesRouter.get("/", articleController.getAll);

	articlesRouter.get("/:id", articleController.getById);

	articlesRouter.post("/", articleController.create);

	articlesRouter.put("/:id", articleController.update);

	articlesRouter.delete("/:id", articleController.delete);

	return articlesRouter;
};
