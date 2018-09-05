import { Category } from './../../models/Category';
import { Expense } from './../../models/Expense';

import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import randomColor  from 'randomcolor'
import { Events } from 'ionic-angular';

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {


  constructor(public events: Events) {}

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
      options: {
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
        onClick :  (evt, item) => {
        
          evt.stopPropagation();
          console.log(evt);
         //2x events fired 
         // touchend + click --> stilll need touchend? 
         if(item.length > 0)
         {
           this.events.publish('expense:clicked', item[0]._index);
         }
      }
      },
      
    });
  }


  buildRandomColors(amount: number) {
    let colors = [];
    for (let i = 0; i <= amount; i++) {
      colors.push(randomColor());
    }
    return colors;
  }

  buildExpenseData(expenses: Expense []) {
    return expenses.map(e => e.getCost());
  }

  buildExpenseLabels(expenses: Expense [])
  {
    return expenses.map(e => e.getDescription())
  }


  buildCategoryData(categories: Category []): number []
  {
    let totalCategoryCosts = [];
    categories.forEach(c => totalCategoryCosts.push(c.getTotalExpenseCost()));
    return totalCategoryCosts;
  } 

  buildCategoryLabels(categories: Category []): string []
  {
    return categories.map(c => c.getCategoryName());
  }

  buildCategoryColors(categories: Category []): string [] {
    return categories.map(c => c.getCategoryColor());
  }






}
