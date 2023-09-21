import { createServerApp } from "../app.js";

// import the actual madel we want to use in the app
import { ArticleModel } from "../src/models/mysql/article.js";
import { UserModel } from "../src/models/mysql/user.js";
import { CategoryModel } from "../src/models/mysql/category.js";

createServerApp({
	articleModel: ArticleModel,
	userModel: UserModel,
	categoryModel: CategoryModel,
});
