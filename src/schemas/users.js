import z from "zod";

export const userSchema = z.object({
	username: z
		.string()
		.min(4, "Username must be at least 4 characters long")
		.max(20, "Username can be a maximum of 20 characters long")
		.nonempty("Username is required"),
	email: z
		.string()
		.email("Invalid email address")
		.nonempty("Email is required"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(20, "Password can be a maximum of 20 characters long")
		.nonempty("Password is required"),
	confirmPassword: z
		.string()
		.min(8, "Confirm password must be at least 8 characters long")
		.max(20, "Confirm password can be a maximum of 20 characters long")
		.nonempty("Confirm password is required")
		.refine((value, ctx) => value === ctx.current.password, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		}),
});

export function validateUser(object) {
	return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
	return userSchema.partial().safeParse(object);
}