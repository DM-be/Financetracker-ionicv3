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



  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public momentProvider: MomentProvider, public monthOverviewProvider: MonthOverviewProvider, public modalCtrl: ModalController) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth() || this.momentProvider.getCurrentYearAndMonth();
    
  
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
    await this.refreshData();
    let categories = this.monthOverview.getCategories();
    let colors = this.chartProvider.buildCategoryColors(categories);
    let data = this.chartProvider.buildCategoryData(categories);
    let labels = this.chartProvider.buildCategoryLabels(categories);
    let categoriesHTML = this.chartProvider.buildCompleteHTML(categories);
    this.ctx = document.getElementById("myChart");
    this.chart = this.chartProvider.createNewChart(this.ctx, data, colors, labels, 'doughnut', false, categoriesHTML);
 //   console.log(categoriesHTML);
    let legend = document.getElementById("chartjs-legend");
    legend.innerHTML = this.chart.generateLegend();
    console.log(this.chart);
    console.log(this.chartProvider.getDatasets());
    console.log(this.chart.data.datasets[0])
    this.chart = this.chartProvider.getChartInstance();
  }

  async updateDate() {
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
    await this.refreshData();
  }


  async refreshData() {
    this.monthOverview = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
  }
  
  addDatasetModal() {
    this.modalCtrl.create(DatasetPage, {
      ctx: this.ctx
    }).present();

  }

}
