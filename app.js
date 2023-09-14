import cors from "cors";
import express, { json } from "express";

import { articlesRouter } from "./src/routes/articles.js";
import { usersRouter } from "./src/routes/users.js";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());

// app.get("/", (_, res) => {
// 	res.json({ message: "Article scanner server 📦" });
// });

app.use("/articles", articlesRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
