import { Router } from "express";

import { UserController } from "../controllers/users.js";

export const usersRouter = Router();

usersRouter.get("/", UserController.getAll);

usersRouter.get("/:id", UserController.getById);

usersRouter.post("/", UserController.create);

usersRouter.put("/:id", UserController.update);

usersRouter.delete("/:id", UserController.delete);

usersRouter.post("/login", UserController.login);
