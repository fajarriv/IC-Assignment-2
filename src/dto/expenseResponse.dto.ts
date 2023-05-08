import * as z from "zod";

export const expenseResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: z.string(),
  amount: z.number().min(0),
});

export type ExpenseResponse = z.infer<typeof expenseResponseSchema>;
