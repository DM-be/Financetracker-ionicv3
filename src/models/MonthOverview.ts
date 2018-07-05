import { Expense } from "./Expense";

export class MonthOverView {

    private _id: string;
    private expenses: Expense [];
    private startBalance: number;
    private endBalance: number;

    constructor(_id: string, startBalance : number) {
        this._id = _id;
        this.expenses = [];
        this.startBalance = startBalance; // always from the previous month
        this.endBalance = startBalance; // always starts with default value startbalance
    }

}