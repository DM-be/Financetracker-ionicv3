export class Budget {

    public limitAmount: number; // limit amount
    public currentAmountSpent: number; // current amount spent

    constructor(limitAmount?: number, currentAmountSpent?: number) {
        if(limitAmount)
        {
            this.limitAmount = limitAmount;
        }
        else {
            this.limitAmount = 0;
        }
        if(currentAmountSpent)
        {
            this.currentAmountSpent = currentAmountSpent;
        }
        else {
            this.currentAmountSpent = 0;
        }
    }

    public isBeingTracked(): boolean {
        //return this.limitAmount !== 0;
        return true;
    }
    public addToAmountSpentInBudget(amount: number)
    {
        this.currentAmountSpent += amount;
    }
    

    // for gui classes
    public aboveBudget(): boolean {
        return this.currentAmountSpent > this.limitAmount;
    }

    public belowBudget(): boolean {
        return this.currentAmountSpent < this.limitAmount;
    }

    public getRemainingAmount() {
        return this.limitAmount - this.currentAmountSpent;
    }


} 