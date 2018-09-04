import { Expense } from './../../models/Expense';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Budget } from '../../models/Budget';

import * as Chart from 'chart.js';
import randomColor  from 'randomcolor'
/**
 * Generated class for the ChartBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-chart-budget',
  templateUrl: 'chart-budget.html',
})
export class ChartBudgetPage {

  public expenses: Expense [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.expenses = this.navParams.get("expenses");
    
    
  }

  ionViewDidLoad() {
    this.buildChart(this.buildData(this.expenses), this.buildRandomColors(2));
  }

  buildData(expenses: Expense []) {
    let data = [];
    this.expenses.forEach(expense => {
      data.push(expense.getCost());
    });
    return data;
  }

  buildRandomColors(amount: number) {
    let colors = [];
    for (let i = 0; i <= amount; i++) {
      colors.push(randomColor());
    }
    return colors;
  }



  buildChart(data, colors) {
    var ctx = document.getElementById("myChart");
    var chartData = {
      datasets: [{
        data: data,
        backgroundColor: colors
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    };

    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: Chart.defaults.doughnut
    });



}

}
