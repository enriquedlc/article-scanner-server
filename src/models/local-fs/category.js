import { randomUUID } from "node:crypto";

import { readJSON } from "../../utils/read-json.js";

const categories = readJSON("../data/categories.json");

export class CategoryModel {
	static async getAll() {
		return categories;
	}

	static async getById(id) {
		return categories.find((category) => category.id === id);
	}

	static async create({ category }) {
		const newCategory = {
			id: randomUUID(),
			...category,
		};

		categories.push(newCategory);

		return newCategory;
	}

	static async delete(id) {
		const categoryIndex = categories.findIndex(
			(category) => category.id === id,
		);

		if (categoryIndex === -1) return false;

		categories.splice(categoryIndex, 1);

		return true;
	}

	static async update({ id, category }) {
		const categoryIndex = categories.findIndex(
			(category) => category.id === id,
		);

		if (categoryIndex === -1) return false;

		const updatedCategory = {
			...categories[categoryIndex],
			...category,
		};

		categories[categoryIndex] = updatedCategory;

		return updatedCategory;
	}
}
