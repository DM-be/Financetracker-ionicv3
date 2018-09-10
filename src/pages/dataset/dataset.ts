import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DatasetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dataset',
  templateUrl: 'dataset.html',
})

export class DatasetPage {



  public labels: string []; // needs to be the same for multiple datasets!
  public data: number []; // numbers associated with the labels --> hobby - 200
  public labelTypes: string [] = ['month', 'year', 'category', 'expense'] //can be week,month,year but also category name, expense description, tag name
  public labelType: string;
  public dataTypes: string [] = ['category', 'expense', 'tag'];
  public dataType: string; // needst to be the same for multiple datasets
  public timeperiod: {from: string, to: string}; // needs to be the same for multiple datasets
  public operationTypes: string [] = ['total', 'average']; // could be different for other datasets, avg vs total for example
  public operationType: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.timeperiod = {from: '', to: ''};

  }

  addDataset() {
    console.log(this.dataType);
    console.log(this.operationType);
  }




}
