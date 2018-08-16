import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, PopoverController } from 'ionic-angular';
import { Account } from '../../models/Account';
import { DbProvider } from '../../providers/db/db';
import { TabsPage } from '../tabs/tabs';
import { IconsPage } from '../icons/icons';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  private accounts = [];
  public owner: string; // name of the owner of the account
  public accountName: string;
  public balance: string;
  public selectedIcon: string;
    

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider, public appCtrl: App, public popoverCtrl: PopoverController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  dismiss() {
    this.navCtrl.pop();
  }

  finishAccounts() {
   // this.dbProvider.setupUserOverview(this.accounts);
    this.dbProvider.setupFirstMonthOverview(this.accounts);
    this.appCtrl.getRootNav().setRoot(TabsPage);
  }

  addAccount() {
    let account = new Account(this.owner, this.accountName, parseInt(this.balance));
    this.owner = "";
    this.accountName = "";
    this.accounts.push(account);
  }

  getSelectedIcon() {
    return this.selectedIcon || "add-circle";
  }



  iconsPopover() {
    let popover = this.popoverCtrl.create(IconsPage);
    popover.present();
    popover.onDidDismiss(icon => {
      if (icon !== undefined) {
        this.selectedIcon = icon
      } else {
        this.selectedIcon = "add-circle"
      }
    });

  }



}
