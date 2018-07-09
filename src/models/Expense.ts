export class Expense {

    public categoryName: string;
    public cost: number;
    public description: string;
    public createdDate: string;
    public usedAccountName: string; 


    constructor(categoryName: string, cost: number, description: string, createdDate: string, usedAccount) {
        this.categoryName = categoryName;
        this.cost = cost;
        this.description = description;
        this.createdDate = createdDate;
        this.usedAccountName = usedAccount;

    }

    public getCost() {
        return this.cost;
    }

    public getUsedAccountName() {
        return this.usedAccountName;
    }
}