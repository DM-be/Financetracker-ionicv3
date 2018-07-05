export class Expense {

    public categoryName: string;
    public cost: number;
    public description: string;


    constructor(categoryName: string, cost: number, description: string) {
        this.categoryName = categoryName;
        this.cost = cost;
        this.description = description;
    }
}