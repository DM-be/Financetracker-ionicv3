import { MomentProvider } from './../../providers/moment/moment';
import { CategoryProvider } from './../../providers/category/category';
import { Category } from './../../models/Category';
import { ChartProvider } from './../../providers/chart/chart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  public ctx;
  public categories: Category [];
  public selectedCategories: Category [] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public categoryProvider: CategoryProvider, public momentProvider: MomentProvider, public alertCtrl: AlertController,) {
    this.timeperiod = {from: '', to: ''};
    this.ctx = this.navParams.get("ctx");
    

  }

  async ionViewWillEnter(){
   this.categories = await this.categoryProvider.getCategories(this.momentProvider.getCurrentYearAndMonth());
  }

 
  createDataDataset(categoryName): Promise<number []> {
   return this.chartProvider.getDatasetData({from: this.timeperiod.from, to: this.timeperiod.to}, categoryName, this.labelType, this.dataType, this.operationType);
  }

  addAllDatasetsToChart() {
    if(this.dataType === 'category')
    {
      let labels = this.momentProvider.getLabelsBetweenTimePeriod(this.timeperiod.from, this.timeperiod.to);

      
      this.chartProvider.clearDatasets();
      this.selectedCategories.forEach(async cat => {
        let data = {data: [], backgroundColor: []};
        data.data = await this.createDataDataset(cat.getCategoryName());
        for (let i = 0; i < data.data.length; i++) {
          data.backgroundColor.push(cat.getCategoryColor());
        }
        this.chartProvider.addDataset(data);
      });
      this.chartProvider.setLabels(labels);
     // this.chartProvider.setType('bar');
     
     console.log(this.chartProvider.getDatasets());
      this.navCtrl.pop();


    }
  }



  addCategoriesAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('What categories do you want to see?');

    this.categories.forEach(category => {
      alert.addInput({
        type: 'checkbox',
        label: category.getCategoryName(),
        value: JSON.stringify(category),
      })
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        data.forEach(cat => {
          let parsedCat = JSON.parse(cat)
          let catObject = new Category(parsedCat.categoryName, parsedCat.categoryColor, parsedCat.iconName, parsedCat.createdDate, parsedCat.expenses, parsedCat.budget);
          this.selectedCategories.push(catObject);
        });
      }
    });
    alert.present();
  }

  




}
