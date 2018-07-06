export class Account {
    public owner: string; // name of the owner of the account
    public accountName: string;
    public initialBalance: number;
    public finalBalance: number;
    
    /**
     *
     */
    constructor(owner: string, accountName: string,initialBalance: number) {
        this.owner = owner;
        this.accountName = accountName;
        this.initialBalance = initialBalance;
        this.finalBalance = initialBalance; // always the same when created 
    }

    public getAccountName() {
        return this.accountName;
    }

   
   
}