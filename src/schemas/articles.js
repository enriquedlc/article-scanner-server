import z from "zod";
import { categorySchema } from "./categories.js";

export const articleShecma = z.object({
	articleName: z
		.string({
			invalid_type_error: "Name must be a string",
			required_error: "Name is required",
		})
		.min(1)
		.max(200),
	barcode: z
		.string({
			invalid_type_error: "Barcode must be a string",
			required_error: "Barcode is required",
		})
		.min()
		.max(30),
	exhibition: z
		.number({
			invalid_type_error: "Exhibition must be a number",
			required_error: "Exhibition is required",
			description: "Exhibition must be greater than 0",
		})
		.int()
		.min(0),
	shelf: z
		.number({
			invalid_type_error: "Shelf must be a number",
			required_error: "Shelf is required",
			description: "Shelf must be greater than 0",
		})
		.int()
		.min(0),
	warehouse: z
		.number({
			invalid_type_error: "Warehouse must be a number",
			required_error: "Warehouse is required",
			description: "Warehouse must be greater than 0",
		})
		.int()
		.min(0),
	category: categorySchema.refine((value) => {
		const result = categorySchema.safeParse(value);
		return result.success;
	}, "Invalid category"),
});

export function validateArticle(object) {
	return articleShecma.safeParse(object);
}

export function validatePartialArticle(object) {
	return articleShecma.partial().safeParse(object);
}
