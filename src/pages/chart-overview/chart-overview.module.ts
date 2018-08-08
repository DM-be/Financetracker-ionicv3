import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartOverviewPage } from './chart-overview';

@NgModule({
  declarations: [
    ChartOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartOverviewPage),
  ],
})
export class ChartOverviewPageModule {}
