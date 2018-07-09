import { Expense } from "./Expense";
import { Account } from "./Account";

export class MonthOverView {

    private _id: string;
    private _rev: string;
    private expenses: Expense [];
    private accounts: Account []; // a copy of the userDoc balance, kept to keep track of balances each month.

    constructor(_id: string, accounts: Account [], expenses?: Expense [] , _rev?: string,) {
        this._id = _id;
        this._rev = _rev;
        this.expenses = [];
        this.accounts = [];
        if(expenses)
        {
            this.expenses = expenses.map(e => new Expense(e.categoryName, e.cost, e.description, e.createdDate, e.usedAccountName));
        }
        this.accounts = accounts.map(a => new Account(a.owner, a.accountName, a.initialBalance, a.finalBalance, a.transactions));
    }

    public getAllAccounts() 
    {
        return this.accounts;
    }

    public getAccByName(accountName: string)
    {
        return this.accounts.find(account => account.getAccountName() === accountName)
    
    }

    public addExpense(expense: Expense)
    {
        this.expenses.push(expense);
    }


    


}