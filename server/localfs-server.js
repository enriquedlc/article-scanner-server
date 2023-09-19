import { createServerApp } from "../app.js";

// import the actual madel we want to use in the app
import { ArticleModel } from "../src/models/local-fs/article.js";

createServerApp({ articleModel: ArticleModel });
