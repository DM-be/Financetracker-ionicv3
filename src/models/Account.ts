import { Transaction } from "./Transaction";

export class Account {
    public owner: string; // name of the owner of the account
    public accountName: string;
    public initialBalance: number;
    public finalBalance: number;
    public transactions: Transaction [];
    
    /**
     *
     */
    constructor(owner: string, accountName: string,initialBalance: number, finalBalance?: number, transactions?: Transaction []) {
        this.owner = owner;
        this.accountName = accountName;
        this.initialBalance = initialBalance;
        this.finalBalance = initialBalance; // always the same when created 
        this.transactions = [];

        if(finalBalance)
        {
            this.finalBalance = finalBalance;
        }
        if(transactions)
        {
            this.transactions = transactions.map(t => new Transaction(t.amount, t.sendingAccountName, t.recievingAccountName, t.operation));
        }
        
    }

    public getAccountName(): string {
        return this.accountName;
    }

    public getTransactions(): Transaction [] {
        return this.transactions;
    }

    public addTransaction(transaction: Transaction): void {
        this.transactions.push(transaction);
    }

    public updateInitialBalance(operation: string, amount: number): void
    {
        if(operation === 'decrease')
        {
            this.initialBalance = this.initialBalance - amount;
        }
        else {
            this.initialBalance = this.initialBalance + amount;
        }
    }

    public updateFinalBalance(operation: string, amount: number): void
    {
        if(operation === 'decrease')
        {
            this.finalBalance = this.finalBalance - amount;
        }
        else {
            this.finalBalance = this.finalBalance + amount;
        }
    }

   

   
   
}