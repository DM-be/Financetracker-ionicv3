import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { MomentProvider } from '../../providers/moment/moment';
import { Account } from '../../models/Account';

/**
 * Generated class for the TransferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {
  public accounts: Account [];
  public currentMonthYearAndDay: string;
  public amount: string;

  // 2 arrays to hold both select options, they need to exclude each other
  public sendingAccountName: string;
  public recievingAccountName: string;
  public sendingAccounts: Account [];
  public recievingAccounts: Account []; 
  


  

  constructor(public navCtrl: NavController, public navParams: NavParams, public accountProvider: AccountProvider, public momentProvider: MomentProvider) {
    this.initialize();
  }

  ionViewDidLoad() {

  }

  onChange(ev) {
    console.log(ev);
  }

  recievingAccountChanged(recievingAccountName: string): void {
    this.sendingAccounts = this.accounts.filter(acc => acc.accountName !== recievingAccountName);
  }

  sendingAccountChanged(sendingAccountName: string): void {
    this.recievingAccounts = this.accounts.filter(acc => acc.accountName !== sendingAccountName);
  }


  async initialize() {
    this.accounts = await this.accountProvider.getAccounts(this.momentProvider.getCurrentMonthAndYear());
    this.sendingAccounts = this.accounts;
    this.recievingAccounts = this.accounts;
    this.currentMonthYearAndDay = this.momentProvider.getCurrentMonthYearAndDay();
    
  }

  dismiss() {
    this.navCtrl.pop();
  }

}
