export class Expense {

    public categoryName: string;
    public cost: number;
    public description: string;
    public dateCreated: string;


    constructor(categoryName: string, cost: number, description: string, dateCreated: string) {
        this.categoryName = categoryName;
        this.cost = cost;
        this.description = description;
        this.dateCreated = dateCreated;
    }
}