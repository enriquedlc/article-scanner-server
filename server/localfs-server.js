import { createServerApp } from "../app.js";

// import the actual madel we want to use in the app
import { ArticleModel } from "../src/models/local-fs/article.js";
import { CategoryModel } from "../src/models/local-fs/category.js";
import { UserModel } from "../src/models/local-fs/user.js";

createServerApp({
	articleModel: ArticleModel,
	userModel: UserModel,
	categoryModel: CategoryModel,
});
