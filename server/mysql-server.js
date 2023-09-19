import { createServerApp } from "../app.js";

// import the actual madel we want to use in the app
import { ArticleModel } from "../src/models/mysql/article.js";

createServerApp({ articleModel: ArticleModel });
