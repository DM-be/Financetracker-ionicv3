import { Expense } from "./Expense";
import { Account } from "./Account";

export class MonthOverView {

    private _id: string;
    private expenses: Expense [];
    private accounts: Account []; // a copy of the userDoc balance, kept to keep track of balances each month.

    constructor(_id: string, accounts: Account []) {
        this._id = _id;
        this.expenses = [];
        this.accounts = accounts;
    }

    public getAllAccounts() 
    {
        return this.accounts;
    }

    public getAccount(accountName: string)
    {
        return this.accounts.filter(account => account.getAccountName() === accountName)
    }

    // 20 af van april uitgaven --> eindsaldo - 20
    // mei --> start en eind - 20

}