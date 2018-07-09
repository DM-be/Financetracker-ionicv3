
import { Account } from "./Account";
import * as moment from 'moment';

export class Transaction {
    /**
     *
     */


    public amount: number;
    public sendingAccountName: Account;
    public recievingAccountName: Account; 
    public transactionDate: string
    constructor(amount: number, sendingAccountName: Account, recievingAccountName: Account, transactionDate? : string) {
        this.amount = amount;
        this.sendingAccountName = sendingAccountName;
        this.recievingAccountName = recievingAccountName;
        if(transactionDate)
        {
            this.transactionDate = transactionDate;
        }
        else {
            this.transactionDate = moment().format();
        }
        
    }


}