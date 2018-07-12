
import { Account } from "./Account";
import * as moment from 'moment';
import * as uniqid from 'uniqid';
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
    public uniqId: string;
    constructor(amount: number, sendingAccountName: string, recievingAccountName: string, operation: string, transactionDate? : string, uniqId?: string) {
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
        if(uniqId)
        {
            this.uniqId = uniqId;
        }
        else {
            this.uniqId = uniqid.time();
        }
        
    }

    public getUniqId(): string 
    {
        return this.uniqId;
    }


}