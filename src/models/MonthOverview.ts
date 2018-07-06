import { Expense } from "./Expense";
import { Account } from "./Account";

export class MonthOverView {

    private _id: string;
    private expenses: Expense [];
    private startBalance: number;
    private endBalance: number;
    private accounts: Account [];

    constructor(_id: string, startBalance : number, accounts: Account []) {
        this._id = _id;
        this.expenses = [];
        this.startBalance = startBalance; // always from the previous month
        this.endBalance = startBalance; // always starts with default value startbalance
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