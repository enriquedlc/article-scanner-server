import { Router } from "express";

import { ArticleController } from "../controllers/articles.js";

export const articlesRouter = Router();

articlesRouter.get("/", ArticleController.getAll);

articlesRouter.get("/:id", ArticleController.getById);

articlesRouter.post("/", ArticleController.craete);

articlesRouter.put("/:id", ArticleController.update);

articlesRouter.delete("/:id", ArticleController.delete);
