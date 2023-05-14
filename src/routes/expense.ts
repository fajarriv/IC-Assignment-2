import { validateExpenseBody } from "../middleware/validateExpenseBody";
import {
  createExpense,
  deleteExpenseById,
  getAllExpense,
  getCategoryExpense,
  getExpenseById,
  updateExpenseById,
  getTotalExpense,
} from "../controllers/expense";
import express, { Router } from "express";
import { validateExpenseParams } from "../middleware/validateExpenseParams";
import { validateQuery } from "../middleware/validateQuery";

const router: Router = express.Router();

router.get("/", validateQuery, getAllExpense);
router.post("/", validateExpenseBody, createExpense);
router.get("/total", getTotalExpense);
router.get("/category", getCategoryExpense);
router.get("/:id", validateExpenseParams, getExpenseById);
router.delete("/:id", validateExpenseParams, deleteExpenseById);
router.put(
  "/:id",
  validateExpenseParams,
  validateExpenseBody,
  updateExpenseById
);

export default router;
