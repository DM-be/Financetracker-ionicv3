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

  constructor(public monthOverviewProvider: MonthOverviewProvider) {
  }

  async updateBudget(_id: string, categoryName: string, newBudget: Budget)
  {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(_id);
    monthOverview.getCategoryByName(categoryName).replaceBudget(newBudget);
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  } 

  async deleteBudget(_id: string, categoryName: string) {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(_id);
    monthOverview.getCategoryByName(categoryName).replaceBudget(new Budget()); // --> 0 0
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  }


}
