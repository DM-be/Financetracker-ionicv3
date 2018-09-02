export class Budget {
 
    public limitAmount: number;
    public currentAmountSpent: number; 

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
        return this.limitAmount > 0;
    }

    setLimitAmount(amount: number) {
        this.limitAmount = amount;
    }

    public addToAmountSpentInBudget(amount: number)
    {
        this.currentAmountSpent += amount;
    }

    reduceAmountSpentInBudget(amount: number): any {
        this.currentAmountSpent -= amount;
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