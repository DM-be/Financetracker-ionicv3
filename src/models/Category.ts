import { Expense } from "./Expense";
import * as moment from 'moment';
import { Budget } from "./Budget";

export class Category {
  
    public categoryName: string;
    public expenses: Expense []
    public budget: Budget;
    public createdDate: string; // added hobby at 07 2018 --> get docs starting from 07 to ... 
    public categoryColor: string;
    public iconName: string; 


    /**
     *
     */
    
    constructor(categoryName: string, categoryColor: string, iconName: string, createdDate: string, expenses?: Expense [], budget?: Budget, ) {
        this.categoryName = categoryName;
        this.categoryColor = categoryColor;
        this.createdDate = createdDate;
        this.iconName = iconName;

        if(expenses)
        {
            this.expenses = expenses.map(e => new Expense(e.cost, e.description, e.createdDate, e.usedAccountName, e.categoryName, e.iconName, e.tags));
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

    public getExpenses(): Expense [] {
        return this.expenses;
    }

    public replaceExpense(expense: Expense)
    {
        let i = this.expenses.findIndex(
            e => e.description == expense.description
            && e.cost === expense.cost
        )
        this.expenses[i] = expense;
    }

    removeExpense(expense: Expense): any {
        let i = this.expenses.findIndex(
            e => e.description == expense.description
            && e.cost === expense.cost
        )
        this.expenses.splice(i, 1);
      }

    public getBudget(): Budget {
        return this.budget;
    }

    public clearExpenses() {
        this.expenses = [];
    }

    public clearCurrentAmountSpentInBudget() {
        this.budget.currentAmountSpent = 0;
    }

    replaceBudget(newBudget: Budget) {
        this.budget = newBudget;
    }

    setIconName(iconName: string): void {
        this.iconName = iconName;
    }

    setCategoryColor(newColor: string): void {
        this.categoryColor = newColor;
    }

    getIconName(): string {
        return this.iconName;
    }

    getCategoryColor(): string {
        return this.categoryColor;
    }

    setCategoryName(newCategoryName: string)
    {
        this.categoryName = newCategoryName;
    } 

    
    

    

}