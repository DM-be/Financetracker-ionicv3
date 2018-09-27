import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatasetDetailsPage } from './dataset-details';

@NgModule({
  declarations: [
    DatasetDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DatasetDetailsPage),
  ],
})
export class DatasetDetailsPageModule {}
