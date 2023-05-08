import * as z from "zod";

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
});

export type Category = z.infer<typeof categorySchema>;
