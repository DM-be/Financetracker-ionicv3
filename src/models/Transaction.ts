
import { Account } from "./Account";
import * as moment from 'moment';

export class Transaction {
    /**
     *
     */


    private amount: number;
    private sendingAccount: Account;
    private recievingAccount: Account; 
    private transactionDate: string
    constructor(amount: number, sendingAccount: Account, recievingAccount: Account) {
        this.amount = amount;
        this.sendingAccount = sendingAccount;
        this.recievingAccount = recievingAccount;
        this.transactionDate = moment().format();
    }


}