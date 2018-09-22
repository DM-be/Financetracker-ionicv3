import { DatasetbuttonProvider } from './../../providers/datasetbutton/datasetbutton';
import {
  DatasetButton
} from './../../models/DatasetButton';
import {
  MonthOverView
} from './../../models/MonthOverview';
import {
  CategoryProvider
} from './../../providers/category/category';
import {
  MomentProvider
} from './../../providers/moment/moment';
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
  ModalController,
  AlertController
} from 'ionic-angular';
import {
  MonthOverviewProvider
} from '../../providers/month-overview/month-overview';
import {
  DatasetPage
} from '../dataset/dataset';

/**
 * Generated class for the ChartOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart-overview',
  templateUrl: 'chart-overview.html',
})
export class ChartOverviewPage {

  public selectedYearAndMonth: string;
  public monthOverview: MonthOverView;
  public selectedChartType: string;
  public chart: any;
  public ctx = document.getElementById("myChart");
  public datasetButtons: DatasetButton[];



  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public momentProvider: MomentProvider, public monthOverviewProvider: MonthOverviewProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, public datasetButtonProvider: DatasetbuttonProvider) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth() || this.momentProvider.getCurrentYearAndMonth();

  }

  async ionViewDidLoad() {

  }
  async ionViewCanEnter() {
    this.setupFirstChart();
    this.datasetButtons = this.datasetButtonProvider.getDatasetButtons();
  }

  private refreshDatasetButtons(): void {
    this.datasetButtons = this.datasetButtonProvider.getDatasetButtons();
  }

  

  ionViewWillEnter() {
    this.chart = this.chartProvider.getChartInstance();
    console.log(this.chart);
  }

  private async setupFirstChart() {
    await this.refreshMonthOverview();
    let categories = this.monthOverview.getCategories();
    let legend = document.getElementById("chartjs-legend");
    legend.innerHTML = this.chartProvider.buildCategoryLegendHTML(categories);
    this.ctx = document.getElementById("myChart");
    await this.chartProvider.setupDefaultChart(this.ctx);
    this.chart = this.chartProvider.getChartInstance();
   // this.datasetButtons.push(this.chartProvider.getDefaultDatasetButton());

  }

  public async updateDate() {
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
    await this.refreshMonthOverview();
  }


  private async refreshMonthOverview() {
    this.monthOverview = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
  }

  public addDatasetModal() {
    let datasetModal = this.modalCtrl.create(DatasetPage, {
      ctx: this.ctx
    });
    datasetModal.present()
    datasetModal.onDidDismiss(datasetModalData => {
      if (datasetModal) {
        const {
          selectedCategories,
          operationType,
          dataType,
          timeperiod,
          backgroundColor
        } = datasetModalData;

        // rebuild legend
        let legend = document.getElementById("chartjs-legend");
        legend.innerHTML = this.chartProvider.buildCategoryLegendHTML(selectedCategories);

        // rebuild chart
        console.log(selectedCategories);
        
        this.chartProvider.handleNewDataset(operationType, timeperiod, backgroundColor, selectedCategories);
        // add datasetbutton
        
        // refresh 
        this.refreshDatasetButtons();
      }
    });

  }

  public legendHidden(): boolean {
    return this.chartProvider.getChartType() === 'line' || this.chartProvider.getChartType() === 'radar';
  }

  public deleteDataset(i: number): void {
    this.chartProvider.deleteDataset(i);
    this.datasetButtonProvider.deleteDatasetButton(i);
    this.refreshDatasetButtons();
    if (this.chartProvider.noDatasets()) {
      
      let legend = document.getElementById("chartjs-legend");
      legend.innerHTML = '';
    }
  }

  public setChartTypeAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Chart type');
    let selectedType = this.chartProvider.getChartType();
    this.chartProvider.getChartTypes().forEach(type => {
      alert.addInput({
        type: 'radio',
        label: type,
        value: type, 
        checked: type === selectedType
      })
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (type: string) => {
        this.chartProvider.setChartType(type);
        this.chartProvider.updateActiveBackgroundColor(type);
        this.chartProvider.updateChartOptions(type);
        this.chartProvider.updateFill(type);
        this.chartProvider.updateBorderColor(type);
      }
    });
    alert.present();
  }

}
