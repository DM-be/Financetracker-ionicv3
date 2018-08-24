export class Budget {

    public limitAmount: number;
    public currentAmountSpent: number; 

    constructor(limitAmount?: number, currentAmountSpent?: number) {
        if(limitAmount)
        {
            this.limitAmount = limitAmount;
        }
        else {
            this.limitAmount = undefined;
        }
        if(currentAmountSpent)
        {
            this.currentAmountSpent = currentAmountSpent;
        }
        else {
            this.currentAmountSpent = undefined;
        }
    }

    public isBeingTracked(): boolean {
        return this.limitAmount >= 0;
    }

   



    public addToAmountSpentInBudget(amount: number)
    {
        this.currentAmountSpent += amount;
    }
    
    public aboveBudget(): boolean {
        return this.currentAmountSpent > this.limitAmount;
    }

    public belowBudget(): boolean {
        return this.currentAmountSpent < this.limitAmount;
    }

    public getRemainingAmount() {
        return this.limitAmount - this.currentAmountSpent;
    }

    public getLimitAmount(): number {
        return this.limitAmount;
    }

    public getCurrentAmountSpent(): number {
        return this.currentAmountSpent;
    }


} 