import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

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
    this.initializeAccounts();
  }

  private async initializeAccounts() {
    //this.accounts = await this.dbProvider.getAccounts()
  }
  ionViewDidLoad() {
    
  }

}
