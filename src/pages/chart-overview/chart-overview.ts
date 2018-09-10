import { MonthOverView } from './../../models/MonthOverview';
import { CategoryProvider } from './../../providers/category/category';
import { MomentProvider } from './../../providers/moment/moment';
import { ChartProvider } from './../../providers/chart/chart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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



  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public momentProvider: MomentProvider, public monthOverviewProvider: MonthOverviewProvider) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth() || this.momentProvider.getCurrentYearAndMonth();
  }

  async ionViewWillEnter(){
    await this.refreshData();
    let categories = this.monthOverview.getCategories();
    console.log(categories);
    let colors = this.chartProvider.buildCategoryColors(categories);
    let data = this.chartProvider.buildCategoryData(categories);
    let labels = this.chartProvider.buildCategoryLabels(categories);
    let ctx = document.getElementById("myChart");
    let categoriesHTML = this.chartProvider.buildCompleteHTML(categories);
    this.chart = this.chartProvider.createNewChart(ctx, data, colors, labels, 'doughnut', false, categoriesHTML);
 //   console.log(categoriesHTML);
    let legend = document.getElementById("chartjs-legend");
    legend.innerHTML = this.chart.generateLegend();
    console.log(this.chart);
    console.log(this.chartProvider.getDatasets());
    console.log(this.chart.data.datasets[0])
  }
  updateChart() {}

  async updateDate() {
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
    await this.refreshData();
  }


  async refreshData() {
    this.monthOverview = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
  }
  
  addDatasetModal() {
    this.navCtrl.push(DatasetPage);
  }

}
