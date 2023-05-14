import categoriesData from "../data/categories";
import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { expenseRequestSchema } from "../dto/expenseRequest.dto";

const reqSchema = z.object({ body: expenseRequestSchema });

export const validateExpenseBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, amount } = req.body;
    if (!name || !category || !amount) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    reqSchema.parse(req);

    const categoryObj = categoriesData.find(
      (categories) => categories.id === category
    );

    // Handling if the category is not found
    if (!categoryObj) {
      return res.status(404).send(`Category id with id ${category} not found`);
    }
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
    }
  }
};

