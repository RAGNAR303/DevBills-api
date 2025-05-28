import type { TransactionType } from "@prisma/client";
import type { CategorySummary } from "./category.types";

export interface TrasactionFilter {
    userId: string,
    date?: {
        gte: Date;
        lte: Date;
    };
    type?: TransactionType;
    categoryId?: string;
}
export interface TrasactionSummary {
totalExpenses : number;
totalIncomes: number;
balance: number;
expensesByCategory: CategorySummary[]


}
  
// gte Greater Than or Equal  mair ou igual (>)
// lte Less Than ot Equal  Menor ou igual (<)