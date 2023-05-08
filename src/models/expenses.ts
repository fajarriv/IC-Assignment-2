import { categorySchema } from "./categories";
import * as z from "zod";

export const expenseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: categorySchema,
  amount: z.number().min(0),
});

export type Expense = z.infer<typeof expenseSchema>;