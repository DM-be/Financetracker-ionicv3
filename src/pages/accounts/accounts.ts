import { UserOverviewProvider } from './../../providers/user-overview/user-overview';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, PopoverController } from 'ionic-angular';
import { Account } from '../../models/Account';
import { DbProvider } from '../../providers/db/db';
import { TabsPage } from '../tabs/tabs';
import { IconsPage } from '../icons/icons';
import { SettingsProvider } from '../../providers/settings/settings';
import { LoggedInTabsPage } from '../logged-in-tabs/logged-in-tabs';

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
  public accountName: string;
  public balance: string;
  public selectedIcon: string;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider, public appCtrl: App, public popoverCtrl: PopoverController, public userOverviewProvider: UserOverviewProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
    
  }

  dismiss() {
    this.navCtrl.pop();
  }

  addAccount() {
   // this.dbProvider.setupUserOverview(this.accounts);
   // this.dbProvider.setupFirstMonthOverview(this.accounts);
   // ---> check if a monthoverview exists, if not do setupfirstmonthoverview
  //let account = new Account(this.userOverviewProvider.getUserOverview, this.accountName, parseInt(this.balance));
  if(true)
  {
   // this.dbProvider.setupFirstMonthOverview([account]);
    this.appCtrl.getRootNav().setRoot(LoggedInTabsPage);
  } 
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
