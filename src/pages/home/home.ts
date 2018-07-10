import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public accountNameA: string;
  public accountNameB: string;
  public amount: string;
  public selectedDate: string;
  constructor(public navCtrl: NavController, public dbProvider: DbProvider) {

  }
/// TODO: implement in front end gui: insufficient funds, get the accounts with autocomplete --> check the balances --> disable button + show/hide div with text
  transferFunds() {

    this.dbProvider.transferBetweenOwnAccounts(this.selectedDate, this.accountNameA, this.accountNameB, parseInt(this.amount));

  }

}
