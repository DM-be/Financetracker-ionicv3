import { ExternalAccountProvider } from './../../providers/external-account/external-account';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MomentProvider } from '../../providers/moment/moment';
import { AccountProvider } from '../../providers/account/account';
import { Account } from '../../models/Account';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { DbProvider } from '../../providers/db/db';
import { ExternalAccount } from '../../models/ExternalAccount';

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
  public externalAccounts: ExternalAccount [];
  public currentMonthYearAndDay: string;
  public accountHolderName: string;
  public recievingAccountName: string;
  public amount: string;
  @ViewChild('searchbar') searchbar: AutoCompleteComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams, public externalAccountProvider: ExternalAccountProvider, public momentProvider: MomentProvider, public accountProvider: AccountProvider) {
    this.initialize();
  }

  async initialize() {
    this.recievingAccounts = await this.accountProvider.getAccounts(this.momentProvider.getCurrentMonthAndYear());
    this.currentMonthYearAndDay = this.momentProvider.getCurrentMonthYearAndDay();
    this.externalAccounts = await this.externalAccountProvider.getExternalAccounts();
  }

  transferFromExternalAccount() {
    if(!this.isInExternalAccounts(this.searchbar.getValue()))
    {
      this.externalAccountProvider.addExternalAccount(new ExternalAccount(this.searchbar.getValue(), this.currentMonthYearAndDay));
    }
    
    
    
  }

  isInExternalAccounts(accountHolderName:string): boolean {
    return (this.externalAccounts.findIndex(extAcc => extAcc.accountHolderName === accountHolderName) !== -1);
  }

  dismiss() {
    this.navCtrl.pop();
  }

  





}