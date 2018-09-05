import { ChartProvider } from './../../providers/chart/chart';
import { Expense } from './../../models/Expense';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public events: Events) {
    this.expenses = this.navParams.get("expenses");

    events.subscribe('expense:clicked', (i) => {console.log(this.expenses[i])});
    
  }

  ionViewDidLoad() {
    let colors = this.chartProvider.buildRandomColors(2);
    let data = this.chartProvider.buildExpenseData(this.expenses);
    var ctx = document.getElementById("myChart");
    this.chartProvider.createNewChart(ctx, data, colors, ['test', 'test']);
    this
   // this.buildChart(this.buildData(this.expenses), this.buildRandomColors(2));
  }

  

  




}
