import { MomentProvider } from './../moment/moment';
import { Budget } from './../../models/Budget';
import { MonthOverviewProvider } from './../month-overview/month-overview';

import { Injectable } from '@angular/core';

/*
  Generated class for the BudgetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BudgetProvider {

  constructor(public monthOverviewProvider: MonthOverviewProvider, public momentProvider: MomentProvider) {
  }

  async updateBudget(categoryName: string, newBudget: Budget)
  {

    let monthOverview = await this.monthOverviewProvider.getMonthOverview(this.momentProvider.getCurrentMonthAndYear());
    monthOverview.getCategoryByName(categoryName).replaceBudget(newBudget);
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  } 

  async deleteBudget(categoryName: string, oldBudget: Budget) {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(this.momentProvider.getCurrentMonthAndYear());
    monthOverview.getCategoryByName(categoryName).replaceBudget(new Budget(0, oldBudget.getCurrentAmountSpent())); // --> 0 0
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  }


}
