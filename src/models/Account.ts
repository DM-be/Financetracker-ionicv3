import { Transaction } from "./Transaction";

export class Account {
    public owner: string; // name of the owner of the account
    public accountName: string;
    public initialBalance: number;
    public finalBalance: number;
    public transactions: Transaction [];
    public iconName: string; 
    
    /**
     *
     */

     // todo fix constructor with iconname 
    constructor(owner: string, accountName: string, initialBalance: number, iconName: string, finalBalance?: number, transactions?: Transaction []) {
        this.owner = owner;
        this.accountName = accountName;
        this.initialBalance = initialBalance;
        this.iconName = iconName;
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

    public getTransactions(): Transaction [] {
        return this.transactions;
    }

    public getAccountName(): string {
        return this.accountName;
    }

    public getIconName(): string {
        return this.iconName;
    }

    public setIconName(iconName: string): void {
        this.iconName = iconName;
    }
    

    public addTransaction(transaction: Transaction): void {
        this.transactions.push(transaction);
    }

    public clearTransactions() {
        this.transactions = [];
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

    public getInitialBalance(): number {
        return this.initialBalance;
    }

    public getFinalBalance(): number {
        return this.finalBalance;
    }

   

   
   
}