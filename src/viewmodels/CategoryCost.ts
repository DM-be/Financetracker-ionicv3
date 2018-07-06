import { Expense } from "../models/Expense";

export class CategoryCost {

    public categoryName: string;
    public categoryTotalCost: number
    public expenses: Expense [];
    constructor(categoryName: string, categoryTotalCost: number, expenses: Expense [] ) {
        this.categoryName = categoryName;
        this.categoryTotalCost = categoryTotalCost;
        this.expenses = expenses;
    }
}