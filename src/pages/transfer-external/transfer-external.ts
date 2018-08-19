import { ExternalAccountProvider } from './../../providers/external-account/external-account';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MomentProvider } from '../../providers/moment/moment';
import { AccountProvider } from '../../providers/account/account';
import { Account } from '../../models/Account';

/**
 * Generated class for the TransferExternalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-transfer-external',
  templateUrl: 'transfer-external.html',
})
export class TransferExternalPage {


  public recievingAccounts: Account []; 
  public currentMonthYearAndDay: string;
  public accountName: string;
  public recievingAccountName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public externalAccountProvider: ExternalAccountProvider, public momentProvider: MomentProvider, public accountProvider: AccountProvider) {
    this.initialize();
  }

  async initialize() {
    this.recievingAccounts = await this.accountProvider.getAccounts(this.momentProvider.getCurrentMonthAndYear());
    this.currentMonthYearAndDay = this.momentProvider.getCurrentMonthYearAndDay();
  }

  test() {
    console.log(this.accountName);
  }

  recievingAccountChanged() {

  }



}
