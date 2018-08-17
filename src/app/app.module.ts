
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
import { AccountsOverviewPage } from '../pages/accounts-overview/accounts-overview';
import { AccountDetailsPage } from '../pages/account-details/account-details';
import { ChartProvider } from '../providers/chart/chart';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { CategoryDetailsPage } from '../pages/category-details/category-details';
import { ExpensesOverviewPage } from '../pages/expenses-overview/expenses-overview';
import { BudgetOverviewPage } from '../pages/budget-overview/budget-overview';
import { ExpenseDetailPage } from '../pages/expense-detail/expense-detail';
import {IonTagsInputModule} from "ionic-tags-input";
import { ChartOverviewPage } from '../pages/chart-overview/chart-overview';
import { SettingsPage } from '../pages/settings/settings';
import { ColorPicker } from '../components/color-picker/color-picker';
import { CategoryPage } from '../pages/category/category';
import { ColorPickerPage } from '../pages/color-picker/color-picker';
import { IconsPage } from '../pages/icons/icons';
import { SettingsProvider } from '../providers/settings/settings';
import { AccountProvider } from '../providers/account/account';

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
    LoggedInTabsPage, 
    AccountsOverviewPage,
    AccountDetailsPage,
    ProgressBarComponent,
    CategoryDetailsPage,
    ExpensesOverviewPage,
    BudgetOverviewPage,
    ExpenseDetailPage,
    ChartOverviewPage,
    SettingsPage,
    ColorPicker,
    CategoryPage,
    ColorPickerPage,
    IconsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ColorPickerModule,
    IonTagsInputModule,
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
    LoggedInTabsPage,
    AccountsOverviewPage,
    AccountDetailsPage,
    CategoryDetailsPage,
    ExpensesOverviewPage,
    BudgetOverviewPage,
    ExpenseDetailPage,
    ChartOverviewPage,
    SettingsPage,
    CategoryPage,
    ColorPickerPage,
    ColorPicker,
    IconsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //{provide: ErrorHandler, useClass: IonicErrorHandler},
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig 
    },
    DbProvider,
    ChartProvider,
    SettingsProvider,
    AccountProvider
  ]
})
export class AppModule {}
