import { Expense, expenseSchema } from "../models/expenses";
import categoriesData from "../data/categories";
import expensesData from "../data/expenses";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ExpenseResponse } from "../dto/expenseResponse.dto";

// get all expense
export const getAllExpense = (req: Request, res: Response) => {
  const data: ExpenseResponse[] = expensesData.map(
    ({ id, category, name, amount }) => {
      return {
        id: id,
        name: name,
        category: category.name,
        amount: amount,
      };
    }
  );
  res.json(data);
};

// create expense
export const createExpense = (req: Request, res: Response) => {
  const { name, category, amount } = req.body;
  const categoryObj = categoriesData.find(
    (categories) => categories.id === category
  );
  const newUUID = uuidv4();
  const newExpense: Expense = {
    id: newUUID,
    name: name,
    category: categoryObj!,
    amount: amount,
  };
  expensesData.push(newExpense);
  res.status(201).json(newExpense);
};

export const getCategoryExpense = (req: Request, res: Response) => {
  res.json(categoriesData);
};

export const getTotalExpense = (req: Request, res: Response) => {
  const totalExpense = expensesData.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
  res.json({ totalExpense });
};

export const getExpenseById = (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = expensesData.find((expense) => expense.id === id);
  res.json(expense);
};

export const deleteExpenseById = (req: Request, res: Response) => {
  const { id } = req.params;
  const expenseIndex = expensesData.findIndex((expense) => expense.id === id);
  expensesData.splice(expenseIndex, 1);
  res.send(`Success delete expense with id ${id}`);
};

export const updateExpenseById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, amount } = req.body;
  const categoryObj = categoriesData.find(
    (categories) => categories.id === category
  );
  const expenseIndex = expensesData.findIndex((expense) => expense.id === id);
  expensesData[expenseIndex] = {
    id: id,
    name: name,
    amount: amount,
    category: categoryObj!
  };
  res.json(expensesData[expenseIndex]);
};
