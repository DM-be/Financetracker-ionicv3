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
export class AccountDetailsPage {

  public account: Account;
  public expenses: Expense [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.account = this.navParams.get("account");
    this.expenses = this.navParams.get("expenses");
    
  }

  details(transaction: Transaction)
  {

  }

  

}
