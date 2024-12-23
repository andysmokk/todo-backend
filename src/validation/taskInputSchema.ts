import { z } from "zod";

const taskInputSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required and cannot be empty.")
    .max(100, "Title must not exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
  completed: z.boolean().default(false),
  dueDate: z.string().date(),
});

export default taskInputSchema;
