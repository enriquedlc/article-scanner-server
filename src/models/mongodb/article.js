import { MongoClient, ServerApiVersion } from "mongodb";

import { readJSON } from "../../utils/read-json.js";

const CREDENTIALS = readJSON("../../credentials/credentials.json");

const client = new MongoClient(CREDENTIALS.DATABASE_URL, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function connect() {
	try {
		await client.connect();
		const database = client.db("article-scanner");
		return database.collection("article");
	} catch (error) {
		console.log(error);
		await client.close();
	}
}

export class ArticleModel {
	static async getAll({ createdAt }) {
		const collection = await connect();
		if (createdAt) {
			return collection.find({ createdAt: { $gte: createdAt } }).toArray();
		}
		return collection.find().toArray();
	}

	static async create({ article }) {
		const collection = await connect();
		const newArticle = {
			createdAt: new Date(),
			updatedAt: new Date(),
			...article,
		};

		await collection.insertOne(newArticle);

		return { ...newArticle };
	}
}
