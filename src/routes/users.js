import { Router } from "express";

import { UserController } from "../controllers/users.js";

export const createUserRouter = ({ userModel }) => {
	const usersRouter = Router();

	const userController = new UserController({ userModel });

	usersRouter.get("/", userController.getAll);

	usersRouter.get("/:id", userController.getById);

	usersRouter.post("/", userController.create);

	usersRouter.put("/:id", userController.update);

	usersRouter.delete("/:id", userController.delete);

	usersRouter.post("/login", userController.login);

	usersRouter.patch("/username/:id", userController.updateUsername);

	usersRouter.patch("/password/:id", userController.updatePassword);

	return usersRouter;
};
