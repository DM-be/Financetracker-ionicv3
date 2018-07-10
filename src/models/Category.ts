import { Expense } from "./Expense";
import * as moment from 'moment';

export class Category {
    public categoryName: string;
    public expenses: Expense []
    public budget: number;
    public createdDate: string; // added hobby at 07 2018 --> get docs starting from 07 to ... 


    /**
     *
     */
    constructor(categoryName: string, expenses?: Expense [], budget?: number, createdDate?: string) {
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
            this.expenses = expenses.map(e => new Expense(e.categoryName, e.cost, e.description, e.createdDate, e.usedAccountName));
        }
        else{
            this.expenses = [];
        }
        if(budget)
        {
            this.budget = budget;
        }
        else {
            this.budget = 0;
        }
        
    }

    public getCategoryName(): string {
        return this.categoryName;
    }
    
    public addExpense(expense: Expense): void {
        this.expenses.push(expense);
    }

}