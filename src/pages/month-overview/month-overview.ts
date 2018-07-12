import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { DbProvider } from '../../providers/db/db';
import { Category } from '../../models/Category';
import Chart from 'chart.js';
import { ExpensePage } from '../expense/expense';

/**
 * Generated class for the MonthOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-month-overview',
  templateUrl: 'month-overview.html',
})
export class MonthOverviewPage {

  public selectedDate: string;
  public categories: Category [];


  constructor(public navCtrl: NavController, public modalCtrl: ModalController,  public dbProvider: DbProvider) {
    this.selectedDate = moment().format('YYYY-MM');    
  }

  async updateDate() {
    await this.dbProvider.getMonthOverview(this.selectedDate);
   // await this.dbProvider.getCategoryCosts(this.selectedDate);
  }

  async ionViewWillEnter() {
    let monthOverviewObject = await this.dbProvider.getMonthOverview(this.selectedDate);
    this.categories = monthOverviewObject.getCategories();
    console.log(monthOverviewObject.getTotalAmountSpent());
    let data  = this.buildData(this.categories);
    this.buildChart(data);
  }

  buildData(categories: Category []) {
    let data = [];
    categories.forEach(category => {
      data.push(category.getBudget().currentAmountSpent);
    });
    return data;
  }

  buildChart(data) {
    var ctx = document.getElementById("myChart");
    var chartData ={
      datasets: [{
          data: data
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Red',
          'Yellow',
          'Blue'
      ]
  };

    var myPieChart = new Chart(ctx,{
      type: 'pie',
      data: chartData,
      options: Chart.defaults.doughnut
  });

    
  }

  addExpenseModal() {
    let expenseModal = this.modalCtrl.create(ExpensePage, {
      "categories": this.categories
    });
    expenseModal.present();
  }

  handleSwipe($e) {
    if ($e.offsetDirection == 4) {
      // Swiped right
      this.selectedDate = moment(this.selectedDate).subtract(1, 'M').format('YYYY-MM');
    } else if ($e.offsetDirection == 2) {
      // Swiped left
      this.selectedDate = moment(this.selectedDate).add(1, 'M').format('YYYY-MM');
    }
    else if ($e.offsetDirection == 8)
    {
      // swiped up
      let dateToTest = moment(this.selectedDate).add(1, 'years').format('YYYY');
      let now = moment().format('YYYY');
      if(dateToTest <= now)
      {
         this.selectedDate = moment(this.selectedDate).add(1, 'years').format('YYYY-MM');
      }
    }
    else if($e.offsetDirection == 16)
    {
      // swiped down
      this.selectedDate = moment(this.selectedDate).subtract(1, 'years').format('YYYY-MM');
    }
  }


}
