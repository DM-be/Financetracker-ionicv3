import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthOverviewPage } from './month-overview';

@NgModule({
  declarations: [
    MonthOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthOverviewPage),
  ],
})
export class MonthOverviewPageModule {}
