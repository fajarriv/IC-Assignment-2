import validateExpenseBody from "../middleware/validateExpense";
import {
  createExpense,
  deleteExpenseById,
  getAllExpense,
  getCategoryExpense,
  getExpenseById,
  updateExpenseById,
} from "../controllers/expense";
import express, { Router } from "express";
import { validateExpenseParams } from "../middleware/validateExpenseParams";

const router: Router = express.Router();

router.get("/", getAllExpense);
router.post("/", validateExpenseBody, createExpense);
router.get("/category", getCategoryExpense);
router.get("/:id", validateExpenseParams, getExpenseById);
router.delete("/:id", validateExpenseParams, deleteExpenseById);
router.put("/:id", validateExpenseParams, validateExpenseBody, updateExpenseById);

export default router;
