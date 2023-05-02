import { Category } from "./categories";

export interface Expense {
  id: string;
  name: string;
  category: Category;
  amount: number;
}
