import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Account } from '../../models/Account';
import { DbProvider } from '../../providers/db/db';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  private accounts = [];
  public owner: string; // name of the owner of the account
  public accountName: string;
  public balance: string;
    

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider, public appCtrl: App, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  finishAccounts() {
    this.dbProvider.setupUserOverview(this.accounts);
    this.dbProvider.setupFirstMonthOverview(this.accounts);
    this.appCtrl.getRootNav().setRoot(TabsPage);
  }

  addAccount() {
    let account = new Account(this.owner, this.accountName, parseInt(this.balance));
    this.owner = "";
    this.accountName = "";
    this.balance = "0";
    this.accounts.push(account);
  }



}
