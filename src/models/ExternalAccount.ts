export class ExternalAccount {

    /* 
    external accounts are accounts such as employers account which can only send/recieve money, 
    without keeping track of detailed info
    */


    public accountHolderName: string;
    public dateCreated: string;

    constructor(accountHolderName: string, dateCreated: string) {
        this.accountHolderName = accountHolderName;
        this.dateCreated = dateCreated;
    }

    public getAccountHolderName(): string {
        return this.accountHolderName;
    }
}