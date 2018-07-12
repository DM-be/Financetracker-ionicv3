import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transaction } from '../../models/Transaction';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.account = this.navParams.get("account");
  }

  details(transaction: Transaction)
  {

  }

  

}
