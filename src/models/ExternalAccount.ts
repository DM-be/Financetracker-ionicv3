export class ExternalAccount {
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