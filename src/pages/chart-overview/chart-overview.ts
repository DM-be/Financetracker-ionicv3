import { MonthOverView } from './../../models/MonthOverview';
import { CategoryProvider } from './../../providers/category/category';
import { MomentProvider } from './../../providers/moment/moment';
import { ChartProvider } from './../../providers/chart/chart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MonthOverviewProvider } from '../../providers/month-overview/month-overview';

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



  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public momentProvider: MomentProvider, public monthOverviewProvider: MonthOverviewProvider) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth() || this.momentProvider.getCurrentYearAndMonth();
  }

  async ionViewWillEnter(){
    this.refreshData();
    let categories = this.monthOverview.getCategories();
    console.log(categories);
    let colors = this.chartProvider.buildCategoryColors(categories);
    let data = this.chartProvider.buildCategoryData(categories);
    console.log(data);
    let labels = this.chartProvider.buildCategoryLabels(categories);
    let ctx = document.getElementById("myChart");
    this.chartProvider.createNewChart(ctx, data, colors, labels, 'pie');
  }
  updateChart() {}

  async updateDate() {
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
    await this.refreshData();
  }


  async refreshData() {
    this.monthOverview = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
  }

}
