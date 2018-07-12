import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsOverviewPage } from './accounts-overview';

@NgModule({
  declarations: [
    AccountsOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountsOverviewPage),
  ],
})
export class AccountsOverviewPageModule {}
