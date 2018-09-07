import {
  Category
} from './../../models/Category';
import {
  Expense
} from './../../models/Expense';

import {
  Injectable
} from '@angular/core';
import * as Chart from 'chart.js';
import randomColor from 'randomcolor'
import {
  Events
} from 'ionic-angular';

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {


  constructor(public events: Events) {}


  public getChartTypes() {
    return ['line', 'pie'];
  }
  createNewChart(ctx: any, data: number[], hexColorsArray: string[], labels: string[], type ? : string, expense ? : boolean, categoriesHTML ? : string) {
    let chartData = {
      datasets: [{
        data: data,
        backgroundColor: hexColorsArray
      }],
      labels: labels
    };
    return new Chart(ctx, {
      type: type || 'pie',
      data: chartData,
      options: {
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
        onClick: (evt, item) => {
          //evt.stopImmediatePropagation();
          //2x events fired 
          // touchend + click --> stilll need touchend?
          if (item.length > 0 && expense) {
            this.events.publish('expense:clicked', item[0]._index);
          }
        },
        legendCallback: (chart) => {
          if (categoriesHTML) {
            return categoriesHTML;
          }
        },
        legend: {
            display: !categoriesHTML
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

  buildExpenseData(expenses: Expense[]) {
    return expenses.map(e => e.getCost());
  }

  buildExpenseLabels(expenses: Expense[]) {
    return expenses.map(e => e.getDescription())
  }


  buildCategoryData(categories: Category[]): number[] {
    let totalCategoryCosts = [];
    categories.forEach(c => totalCategoryCosts.push(c.getTotalExpenseCost()));
    return totalCategoryCosts;
  }

  buildCategoryLabels(categories: Category[]): string[] {
    return categories.map(c => c.getCategoryName());
  }

  buildCategoryColors(categories: Category[]): string[] {
    return categories.map(c => c.getCategoryColor());
  }

  buildIconLegend(categories: Category[]) {
    let icons = categories.map(c => c.getIconName())

  }

  private buildIconHTMLForComplexLegend(iconName: string) {
    return `<ion-icon name="${iconName}" class="icon icon-md ion-md-${iconName} item-icon legend"></ion-icon>`;
  }

  public buildCompleteHTML(categories: Category[]) {
    let html = `<ul>`;
    categories.forEach(c => {
      html += `<li> <span style="background-color:${c.getCategoryColor()}">`
      html += this.buildIconHTMLForComplexLegend(c.getIconName());
      html += `</span>`
      html += '</li>'
    });
    html += `</ul>`
    return html;
  }






}
