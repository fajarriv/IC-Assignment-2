import expenseData from "../data/expenses";
import { NextFunction, Request, Response } from "express";
import * as z from "zod";

const reqSchema = z.object({ params: z.object({ id: z.string().uuid() }) });

export const validateExpenseParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    reqSchema.parse(req);
    const { id } = req.params;
    const expense = expenseData.find((expense) => expense.id === id);
    if (!expense) {
      res.status(404).send(`Expense with id "${id}" not found!`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
    }
  }
  next();
};
