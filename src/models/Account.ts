export class Account {
    private owner: string; // name of the owner of the account
    private accountName: string;
    private balance: number;
    
    /**
     *
     */
    constructor(owner: string, accountName: string,balance: number) {
        this.owner = owner;
        this.accountName = accountName;
        this.balance = balance;
    }

    public getAccountName() {
        return this.accountName;
    }

    public getBalance() {
        return this.balance;
    }

    public increaseBalance(amount: number)
    {
        this.balance = this.balance + amount;
    } 
    public decreaseBalance(amount: number)
    {
        this.balance = this.balance - amount;
    }

}