import {z} from 'zod'

const createQuestionSetSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
      message: "Price must be greater than or equal to 0",
    }),
  currency: z.string().min(1, "Currency is required"),
  accessDurationDays: z.number().min(1, "Access duration must be at least 1 day"),
});


export type CreateQuestionSetFormData = z.infer<typeof createQuestionSetSchema>;

export {createQuestionSetSchema} 