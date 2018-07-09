import { Transaction } from "./Transaction";

export class Account {
    public owner: string; // name of the owner of the account
    public accountName: string;
    public initialBalance: number;
    public finalBalance: number;
    private transactions: Transaction [];
    
    /**
     *
     */
    constructor(owner: string, accountName: string,initialBalance: number) {
        this.owner = owner;
        this.accountName = accountName;
        this.initialBalance = initialBalance;
        this.finalBalance = initialBalance; // always the same when created 
        this.transactions = [];
    }

    public getAccountName() {
        return this.accountName;
    }

    public getTransactions() {
        return this.transactions;
    }

    public addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
    }

   
   
}