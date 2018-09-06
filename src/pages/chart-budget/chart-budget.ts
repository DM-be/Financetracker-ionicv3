import { ExpenseDetailPage } from './../expense-detail/expense-detail';
import { ChartProvider } from './../../providers/chart/chart';
import { Expense } from './../../models/Expense';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public events: Events, public modalCtrl: ModalController) {
    this.expenses = this.navParams.get("expenses");

    events.subscribe('expense:clicked', (i) => {
      this.detailExpenseModal(this.expenses[i]);
    });
    
  }

  ionViewDidLoad() {
    let colors = this.chartProvider.buildRandomColors(2);
    let data = this.chartProvider.buildExpenseData(this.expenses);
    var ctx = document.getElementById("myChart");
    this.chartProvider.createNewChart(ctx, data, colors, ['test', 'test']);
    console.log(data);

   // this.buildChart(this.buildData(this.expenses), this.buildRandomColors(2));
  }



  detailExpenseModal(expense: Expense) {
    let detailExpenseModal = this.modalCtrl.create(ExpenseDetailPage, {
      expense: expense,
      editMode: false,
    })
    detailExpenseModal.present();
  }

  dismissAndUnSubscribe() {
    this.events.unsubscribe('expense:clicked'); 
    // every time this page gets instantiated, another subscription is made
    // unsubscribe when leaving to prevent this
    this.navCtrl.pop();
  }



  

  




}
