export class Expense {

    public categoryName: string;
    public cost: number;
    public description: string;
    public dateCreated: string;
    public usedAccount: string; 


    constructor(categoryName: string, cost: number, description: string, dateCreated: string, usedAccount) {
        this.categoryName = categoryName;
        this.cost = cost;
        this.description = description;
        this.dateCreated = dateCreated;
        this.usedAccount = usedAccount;

    }
}