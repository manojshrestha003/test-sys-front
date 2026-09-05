import { z } from "zod"

export const registerSchema = z
	.object({
		name: z.string().trim().min(2, "Name must be at least 2 characters."),
		email: z.string().trim().email("Enter a valid email address."),
		password: z.string().min(8, "Password must be at least 8 characters long."),
		confirmPassword: z.string().min(1, "Please confirm your password."),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	})

export const loginSchema = z.object({
	email: z.string().trim().email("Enter a valid email address."),
	password: z.string().min(1, "Password is required."),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>