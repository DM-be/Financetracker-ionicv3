import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ExpensePage } from '../expense/expense';
import { AccountsPage } from '../accounts/accounts';
import { MonthOverviewPage } from '../month-overview/month-overview';
import { HomePage } from '../home/home';
import { AccountsOverviewPage } from '../accounts-overview/accounts-overview';

/**
 * Generated class for the LoggedInTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-logged-in-tabs',
  templateUrl: 'logged-in-tabs.html',
})
export class LoggedInTabsPage {


  public accounts = AccountsPage;
  public monthOverview = MonthOverviewPage;
  public home = HomePage;
  public accountsOverview = AccountsOverviewPage;

  public tabsPlacement: string;
  public tabsLayout: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    if (!this.platform.is('mobile')) {
      this.tabsPlacement = 'top';
      this.tabsLayout = 'icon-left';
    }
  }


}
