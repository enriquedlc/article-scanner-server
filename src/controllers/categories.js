import { validateCategory } from "../schemas/categories.js";

export class CategoryController {
	constructor({ categoryModel }) {
		this.categoryModel = categoryModel;
	}

	getAll = async (_, res) => {
		const categories = await this.categoryModel.getAll();

		res.json({ message: "Categories retrieved successfully", categories });
	};

	getById = async (req, res) => {
		const { id } = req.params;
		const category = await this.categoryModel.getById({ id });

		if (category) return res.json(category);

		res.status(404).json({ message: "Category not found" });
	};

	create = async (req, res) => {
		const result = validateCategory(req.body);

		if (!result.success) return res.status(400).json({ message: result.error });

		const newCategory = await this.categoryModel.create({
			category: result.data,
		});

		res.status(201).json(newCategory);
	};

	update = async (req, res) => {
		const { id } = req.params;
		const result = validateCategory(req.body);

		if (!result.success)
			return res.status(400).json({ message: JSON.parse(result.error.message) });

		const updatedCategory = await this.categoryModel.update({
			id,
			category: result.data,
		});

		res.json(updatedCategory);
	};

	delete = async (req, res) => {
		const { id } = req.params;

		const deleted = await this.categoryModel.delete(id);

		if (deleted) return res.json({ message: "Category deleted" });

		res.status(404).json({ message: "Category not found" });
	};
}
