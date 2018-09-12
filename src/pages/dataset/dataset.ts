import { MomentProvider } from './../../providers/moment/moment';
import { CategoryProvider } from './../../providers/category/category';
import { Category } from './../../models/Category';
import { ChartProvider } from './../../providers/chart/chart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

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
  public labelTypes: string [] = ['month', 'year', 'category', 'tag'] //can be week,month,year but also category name, expense description, tag name
  public labelType: string;
  public dataTypes: string [] = ['category','tag'];
  public dataType: string; // needst to be the same for multiple datasets
  public timeperiod: {from: string, to: string}; // needs to be the same for multiple datasets
  public operationTypes: string [] = ['total', 'average']; // could be different for other datasets, avg vs total for example
  public operationType: string;
  public ctx;
  public categories: Category [];
  public selectedCategories: Category [] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public categoryProvider: CategoryProvider, public momentProvider: MomentProvider, public alertCtrl: AlertController, private view: ViewController) {
    this.timeperiod = {from: '', to: ''};
    this.ctx = this.navParams.get("ctx");
    

  }

  async ionViewWillEnter(){
   this.categories = await this.categoryProvider.getCategories(this.momentProvider.getCurrentYearAndMonth());
  }

 
  createDataDataset(categoryName): Promise<number []> {
   return this.chartProvider.getDatasetData({from: this.timeperiod.from, to: this.timeperiod.to}, categoryName, this.labelType, this.dataType, this.operationType);
  }

  createDataDatasetSingular(categories: Category []): Promise <number []>
 {
   return this.chartProvider.getDatasetData({from: this.timeperiod.from, to: this.timeperiod.to}, undefined, this.labelType, this.dataType, this.operationType, categories);
 }

  async addAllDatasetsToChart() {
    if(this.dataType === 'category' && this.labelType === 'month')
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
      this.view.dismiss(this.selectedCategories);
    }
    else if(this.dataType === 'category' && this.labelType === 'category')
    {
      let labels = [];
      labels = this.selectedCategories.map(c => c.getCategoryName());
      

      let data = {data: [], backgroundColor: []};
      this.chartProvider.clearDatasets();
      console.log(await this.createDataDatasetSingular(this.selectedCategories));
      data.data = await this.createDataDatasetSingular(this.selectedCategories);
      data.backgroundColor = this.selectedCategories.map(c => c.getCategoryColor());
      console.log(data);
      this.chartProvider.addDataset(data);
      this.chartProvider.setLabels(labels);
      this.view.dismiss(this.selectedCategories);
      
      
      
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
