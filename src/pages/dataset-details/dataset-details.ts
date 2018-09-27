import { MomentProvider } from './../../providers/moment/moment';
import { CategoryProvider } from './../../providers/category/category';
import { DatasetButton } from './../../models/DatasetButton';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DatasetDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dataset-details',
  templateUrl: 'dataset-details.html',
})
export class DatasetDetailsPage {
  public datasetButton: DatasetButton;
  public datasetButtonNumber: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.datasetButtonNumber = this.navParams.get("number");
    this.datasetButton = this.navParams.get("datasetButton");
    console.log(this.datasetButton);
  }

  async ionViewWillEnter() {
  }

}
