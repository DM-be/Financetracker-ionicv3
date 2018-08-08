import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transaction } from '../../models/Transaction';
import { Expense } from '../../models/Expense';

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})

// TODO: make a pipe for date formatting!
export class AccountDetailsPage {

  public account: Account;
  public expenses: Expense [];
  public transactions: Transaction [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.account = this.navParams.get("account");
    this.expenses = this.navParams.get("expenses");
    this.transactions = this.account.getTransactions();
    
    
  }

  details(transaction: Transaction)
  {

  }

  getOperationSign(operation:string): string {
    if(operation === 'increase')
    {
      return '+';
    }
    return '-'
  }

  

}
