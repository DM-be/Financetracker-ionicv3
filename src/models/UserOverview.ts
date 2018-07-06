import { Account } from "./Account";

export class UserOverview {
    /**
     *
     */

    private username: string;
    private _id: string;
    private accounts: Account []; // holds all the accounts of the user --> balances get copied to respective docs
    constructor(username: string, accounts: Account []) {
        this.username = username;
        this.accounts = accounts;
        this._id = username;
        
    }

    public getAllAccounts() 
    {
        return this.accounts;
    }

    public getAccount(accountName: string)
    {
        return this.accounts.filter(account => account.getAccountName() === accountName)
    }

    public createAccount(owner: string, accountName: string, balance: string) // keep string? according to form or not
    {
        try {
            let account = new Account(owner, accountName, parseInt(balance));
        } catch (error) {
            console.log('error in creating a new account for this user', error);
        }
    }


}