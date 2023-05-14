import categoriesData from "../data/categories";
import { NextFunction, Request, Response } from "express";
import * as z from "zod";

const categoriesId = categoriesData.map((category) => category.id);
const categorySchema = z
  .string()
  .uuid()
  .refine(
    (id) => categoriesId.includes(id),
    (id) => ({
      message: `Category id with id ${id} not found!`,
    })
  );

const querySchema = z.object({
  query: z.object({
    category_id: z.optional(z.array(categorySchema)),
    min_price: z.optional(z.number().min(0)),
    max_price: z.optional(z.number().min(0)),
  }),
});

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { category_id, min_price, max_price } = req.query;
    category_id = category_id?.toString().split(",");

    querySchema.parse({
      query: { category_id, min_price, max_price },
    });

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
    }
  }
};
