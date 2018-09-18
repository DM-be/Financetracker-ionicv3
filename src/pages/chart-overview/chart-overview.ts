import { DatasetButton } from './../../models/DatasetButton';
import { MonthOverView } from './../../models/MonthOverview';
import { CategoryProvider } from './../../providers/category/category';
import { MomentProvider } from './../../providers/moment/moment';
import { ChartProvider } from './../../providers/chart/chart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MonthOverviewProvider } from '../../providers/month-overview/month-overview';
import { DatasetPage } from '../dataset/dataset';

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
  public datasetButtons: DatasetButton [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public momentProvider: MomentProvider, public monthOverviewProvider: MonthOverviewProvider, public modalCtrl: ModalController) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth() || this.momentProvider.getCurrentYearAndMonth();
    this.datasetButtons = [];
  
  }

  async ionViewDidLoad(){
    
  }
  async ionViewCanEnter(){
   this.setupFirstChart();
  }

  updateChart() {}

  ionViewWillEnter(){
   this.chart = this.chartProvider.getChartInstance();
   console.log(this.chart);
  }

  async setupFirstChart() {
    await this.refreshMonthOverview();
    let categories = this.monthOverview.getCategories();
    let legend = document.getElementById("chartjs-legend");
    legend.innerHTML = this.chartProvider.buildCategoryLegendHTML(categories);
    this.ctx = document.getElementById("myChart");
    await this.chartProvider.setupDefaultChart(this.ctx);
    this.chart = this.chartProvider.getChartInstance();
    this.datasetButtons.push(this.chartProvider.getDefaultDatasetButton());
    
  }

  async updateDate() {
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
    await this.refreshMonthOverview();
  }


  async refreshMonthOverview() {
    this.monthOverview = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
  }
  
  addDatasetModal() {
    let datasetModal = this.modalCtrl.create(DatasetPage, {
      ctx: this.ctx
    });
    datasetModal.present()

    datasetModal.onDidDismiss(datasetModalData => {
      const {selectedCategories, operationType, dataType, timeperiod} = datasetModalData;
      //let selectedCategories = operationTypeWithCategories.categories;
      //let operationType = operationTypeWithCategories.operationType;
      if(selectedCategories) // new dataset was entered
      {
      // rebuild legend
      let legend = document.getElementById("chartjs-legend");
      legend.innerHTML = this.chartProvider.buildCategoryLegendHTML(selectedCategories);

      // rebuild chart
      console.log(selectedCategories);
      this.chartProvider.handleNewDataset(operationType, timeperiod, selectedCategories); 
      // add datasetbutton
      this.datasetButtons.push(new DatasetButton(operationType, dataType, timeperiod));  
      }

    }
    ); 

  }

  deleteDataset(i: number)
  {
    this.chartProvider.deleteDataset(i);
    this.datasetButtons.splice(i, 1);
    if(this.chartProvider.noDatasets())
    {
      let legend = document.getElementById("chartjs-legend");
      legend.innerHTML = '';
    }
  }

}
