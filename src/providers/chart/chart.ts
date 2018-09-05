import { Expense } from './../../models/Expense';

import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import randomColor  from 'randomcolor'

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {

  constructor() {}

  createNewChart(ctx: any, data: number [], hexColorsArray: string [], labels: string [],   options?: any)
  { 
    let chartData = {
      datasets: [{
        data: data,
        backgroundColor: hexColorsArray
      }],
      labels: labels
    };
    new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: Chart.defaults.doughnut
    });
  }

  buildRandomColors(amount: number) {
    let colors = [];
    for (let i = 0; i <= amount; i++) {
      colors.push(randomColor());
    }
    return colors;
  }

  buildData(expenses: Expense []) {
    return expenses.map(e => e.getCost());
  }



}
