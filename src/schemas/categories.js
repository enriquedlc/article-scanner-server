import z from "zod";

export const categorySchema = z.object({
	name: z
		.string({
			invalid_type_error: "Name must be a string",
			required_error: "Name is required",
		})
		.min(1)
		.max(50),
});

export function validateCategory(object) {
	return categorySchema.safeParse(object);
}

export function validatePartialCategory(object) {
	return categorySchema.partial().safeParse(object);
}
