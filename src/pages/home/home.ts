import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public accountNameA: string;
  public accountNameB: string;
  public amount: string;
  public selectedDate: string; // month to add transaction
  public transferDate: string; // yyyy mm dd --> exact date in the past, needed to add manual transfer in the past
  constructor(public navCtrl: NavController, public dbProvider: DbProvider) {

  }
/// TODO: implement in front end gui: insufficient funds, get the accounts with autocomplete --> check the balances --> disable button + show/hide div with text
  
  public isDateInThePast() {
    return this.selectedDate < moment().format('YYYY-MM');
  }


  transferFunds() {
    if(this.transferDate)
    {
      this.dbProvider.addTransfer(this.selectedDate, this.accountNameA, this.accountNameB, parseInt(this.amount), this.transferDate);
    }
    else {
      this.dbProvider.addTransfer(this.selectedDate, this.accountNameA, this.accountNameB, parseInt(this.amount),moment().format('YYYY-MM-DD'));
    }
  }

}
