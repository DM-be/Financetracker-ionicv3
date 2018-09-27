import {
  Dataset
} from './../../models/Dataset';
import {
  MomentProvider
} from './../../providers/moment/moment';
import {
  CategoryProvider
} from './../../providers/category/category';
import {
  Category
} from './../../models/Category';
import {
  ChartProvider
} from './../../providers/chart/chart';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ViewController
} from 'ionic-angular';

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
  public labels: string[] = [] // needs to be the same for multiple datasets!
  public labelTypes: string[] = ['month', 'year', 'category', 'tag'] //can be week,month,year but also category name, expense description, tag name
  public labelType: string;
  public dataTypes: string[] = ['category', 'tag'];
  public dataType: string; // needst to be the same for multiple datasets
  public timeperiod: {
    from: string,
    to: string
  }; // needs to be the same for multiple datasets
  public operationTypes: string[] = ['total', 'average']; // could be different for other datasets, avg vs total for example
  public operationType: string;
  public ctx;
  public categories: Category[];
  public selectedCategories: Category[] = []// obs
  public selectedData: string[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public categoryProvider: CategoryProvider, public momentProvider: MomentProvider, public alertCtrl: AlertController, private view: ViewController) {
    this.timeperiod = {
      from: '',
      to: ''
    };
  }

  public checkForLabels(): void {
    if (this.labelType === 'month') {
      if (this.timeperiod.from !== '' && this.timeperiod.to !== '') {
        this.labels = this.momentProvider.getLabelsBetweenTimePeriod(this.timeperiod.from, this.timeperiod.to);
      }
    }
    else if( this.labelType === 'category'){ 
      this.labels = this.selectedData; 
    }
  }

  private convertSelectedDataToCategories(): Category []
  {
    let cats = [];
    this.categories.forEach(c => {
      this.selectedData.forEach(sd => {
        if(sd === c.getCategoryName())
        {
          cats.push(c);
        }
      })
    });
    return cats;
  }

  async ionViewWillEnter() {
    this.categories = await this.categoryProvider.getCategories(this.momentProvider.getCurrentYearAndMonth());
    this.dataType = this.chartProvider.getDataType() || undefined;
    this.labelType = this.chartProvider.getLabelType() || undefined;
    this.labels = this.chartProvider.getChartLabels();
    this.selectedData = this.chartProvider.getSelectedData();
    if(this.dataType === 'category' && this.selectedData.length > 0)
    {
      this.selectedCategories = this.convertSelectedDataToCategories();
    }
    this.ctx = this.navParams.get("ctx");
  }

  public addAllDatasetsToChart(): void {
    this.chartProvider.setDataType(this.dataType);
    this.chartProvider.setSelectedData(this.selectedData);
    this.chartProvider.setLabelType(this.labelType);
    let datasetModalData = {
      operationType: this.operationType,
      timeperiod: this.timeperiod,
      selectedCategories: this.selectedCategories,
      dataType: this.dataType,
      backgroundColor: this.chartProvider.getRandomColor()
    }
    this.view.dismiss(datasetModalData);
  }

  public addCategoriesAlert(): void {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select categories');
    this.categories.forEach(category => {
      alert.addInput({
        type: 'checkbox',
        label: category.getCategoryName(),
        value: JSON.stringify(category),
        checked: (this.selectedCategories.findIndex(sc => sc.categoryName === category.categoryName) >= 0)
      })
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.selectedData = [];
        this.selectedCategories = [];
        data.forEach(cat => {
          let parsedCat = JSON.parse(cat)
          let catObject = new Category(parsedCat.categoryName, parsedCat.categoryColor, parsedCat.iconName, parsedCat.createdDate, parsedCat.expenses, parsedCat.budget);
          this.selectedCategories.push(catObject);
          this.selectedData.push(parsedCat.categoryName);
          if (this.dataType === this.labelType) // for category and category
          {
            this.labels = this.selectedData;
          }
        });
      }
    });
    alert.present();
  }

  public dismiss(): void {
    this.view.dismiss();
  }

  public notFilledIn(): boolean {
    return (this.dataType === undefined || this.dataType === ''|| this.timeperiod.from === '' || this.timeperiod.to === ''|| this.operationType === undefined || this.operationType === '' || this.labelType === undefined || this.labelType === '');
  }       

}
