import z from "zod";

export const categorySchema = z.object({
	categoryName: z.enum(
		[
			"Tornillería",
			"Herramientas",
			"Ferretería",
			"Guantes",
			"Electricidad",
			"Iluminación",
			"Coches",
			"Bicicletas",
			"Deporte",
			"Ruedas",
			"Carteles",
			"Pesca",
			"Cutters",
			"Cordeltería",
			"Pintura",
			"Jardinería",
		],
		"Invalid category name",
	),
});

export function validateCategory(object) {
	return categorySchema.safeParse(object);
}

export function validatePartialCategory(object) {
	return categorySchema.partial().safeParse(object);
}
