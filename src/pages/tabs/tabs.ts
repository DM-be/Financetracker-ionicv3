import { Component } from '@angular/core';

import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { NavController, Platform } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tabsPlacement: string;
  public tabsLayout: string;
  public signup: any = SignupPage;
  public login: any = LoginPage;

  constructor(public navCtrl: NavController, public platform: Platform) {
    if (!this.platform.is('mobile')) {
      this.tabsPlacement = 'top';
      this.tabsLayout = 'icon-left';
    }
  }
}
