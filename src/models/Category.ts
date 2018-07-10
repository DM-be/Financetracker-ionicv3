import { Expense } from "./Expense";
import * as moment from 'moment';
import { Budget } from "./Budget";

export class Category {
    public categoryName: string;
    public expenses: Expense []
    public budget: Budget;
    public createdDate: string; // added hobby at 07 2018 --> get docs starting from 07 to ... 


    /**
     *
     */
    constructor(categoryName: string, expenses?: Expense [], budget?: Budget, createdDate?: string) {
        this.categoryName = categoryName;
        if(createdDate)
        {
            this.createdDate = createdDate;
        }
        else {
            this.createdDate = moment().format('YYYY-MM');
        }
        if(expenses)
        {
            this.expenses = expenses.map(e => new Expense(e.cost, e.description, e.createdDate, e.usedAccountName, e.tags));
        }
        else{
            this.expenses = [];
        }
        if(budget)
        {
            this.budget = new Budget(budget.limitAmount, budget.currentAmountSpent);
        }
        else {
            this.budget = new Budget();
        }
        
    }

    public getCategoryName(): string {
        return this.categoryName;
    }
    
    public addExpense(expense: Expense): void {
        this.expenses.push(expense);
    }

    public getBudget(): Budget {
        return this.budget;
    }

    

    

}