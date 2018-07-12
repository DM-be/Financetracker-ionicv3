import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AccountDetailsPage } from '../account-details/account-details';

/**
 * Generated class for the AccountsOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts-overview',
  templateUrl: 'accounts-overview.html',
})
export class AccountsOverviewPage {

  public accounts: Account [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider) {

  }

  private async initializeAccounts() {
    this.accounts = await this.dbProvider.getAllAccounts();
  }
  ionViewWillEnter() {
    var t0 = performance.now();
    this.initializeAccounts();
    var t1 = performance.now();
    console.log("Call to initaccounts took " + (t1 - t0) + " milliseconds.")
    
  }

  details(account: Account)
  {
    this.navCtrl.push(AccountDetailsPage, {
      account: account
    });
    
  } 

}
