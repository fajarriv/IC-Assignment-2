import * as z from "zod";

export const expenseRequestSchema = z.object({
  name: z.string(),
  category: z.string().uuid(),
  amount: z.number().min(0),
});

export type ExpenseRequest = z.infer<typeof expenseRequestSchema>;