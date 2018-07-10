
import { Account } from "./Account";
import * as moment from 'moment';

export class Transaction {
    /**
     *
     */
        // logs any transaction

    public amount: number;
    public sendingAccountName: string;
    public recievingAccountName: string; 
    public transactionDate: string;
    public operation: string;
    constructor(amount: number, sendingAccountName: string, recievingAccountName: string, operation: string, transactionDate? : string) {
        this.amount = amount;
        this.sendingAccountName = sendingAccountName;
        this.recievingAccountName = recievingAccountName;
        this.operation = operation;
        if(transactionDate)
        {
            this.transactionDate = transactionDate;
        }
        else {
            this.transactionDate = moment().format();
        }
        
    }


}