import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MyHammerConfig } from '../configs/MyHammerConfig';
import { DbProvider } from '../providers/db/db';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { SignupPage } from '../pages/signup/signup';
import { AccountsPage } from '../pages/accounts/accounts';
import { ExpensePage } from '../pages/expense/expense';
import { MonthOverviewPage } from '../pages/month-overview/month-overview';
import { LoggedInTabsPage } from '../pages/logged-in-tabs/logged-in-tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    AccountsPage,
    ExpensePage,
    MonthOverviewPage,
    LoggedInTabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    AccountsPage,
    ExpensePage,
    MonthOverviewPage,
    LoggedInTabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //{provide: ErrorHandler, useClass: IonicErrorHandler},
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig 
    },
    DbProvider
  ]
})
export class AppModule {}
