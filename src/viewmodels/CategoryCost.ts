export class CategoryCost {

    public categoryName: string;
    public categoryTotalCost: number
    constructor(categoryName: string, categoryTotalCost: number ) {
        this.categoryName = categoryName;
        this.categoryTotalCost = categoryTotalCost;
    }
}