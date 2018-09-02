import { MomentProvider } from './../moment/moment';
import { Account } from './../../models/Account';
import { Expense } from './../../models/Expense';
import { MonthOverviewProvider } from './../month-overview/month-overview';

import { Injectable } from '@angular/core';

/*
  Generated class for the ExpenseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseProvider {

  constructor(public monthOverviewProvider: MonthOverviewProvider, public momentProvider: MomentProvider) {
  }

  public async getExpenses(_id: string, categoryName: string) {
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    return monthOverviewObject.getExpensesByCategoryName(categoryName);
  }

  public async editExpense(_id: string, categoryName, expense: Expense)
  {
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    let category = monthOverviewObject.getCategoryByName(categoryName);
    category.replaceExpense(expense);
    await this.monthOverviewProvider.saveMonthOverview(monthOverviewObject);
  }
  
  public async addExpense(_id: string, categoryName, expense: Expense, oldCategoryName?: string, oldAccountName?: string)
  {
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    let category = monthOverviewObject.getCategoryByName(categoryName);
    category.addExpense(expense);
    category.getBudget().addToAmountSpentInBudget(expense.getCost());
    if(oldCategoryName)
    {
      // case: updating categoryname requires removal of the expense in the old category
      let oldCategory = monthOverviewObject.getCategoryByName(oldCategoryName);
      oldCategory.removeExpense(expense);
      oldCategory.getBudget().reduceAmountSpentInBudget(expense.getCost());
    }
    // case: updating categoryname in the past, has no effect on balances

    if(oldAccountName)
    {
      let oldAccount = monthOverviewObject.getAccByName(oldAccountName);
      oldAccount.updateFinalBalance('increase', expense.getCost());
      oldAccount.updateInitialBalance('increase', expense.getCost());
      if(_id !== this.momentProvider.getCurrentYearAndMonth())
      {
        // update final and initial balances in following months
      }


    }
    else {
      let account = monthOverviewObject.getAccByName(expense.getUsedAccountName())
      account.updateFinalBalance('increase', expense.getCost());
      // do not update initialbalance because we are still in current month
      if(_id !== this.momentProvider.getCurrentYearAndMonth())
      {
        // increase final and initial balances in following months
      }
    }
    
    await this.monthOverviewProvider.saveMonthOverview(monthOverviewObject);
    
  }

  public async updateExpenseAccountName(_id: string, expense: Expense, oldAccountName: string) 
  {
    // new expense has updated account name
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    let newAccount = monthOverviewObject.getAccByName(expense.getUsedAccountName());
    newAccount.updateFinalBalance('increase', expense.getCost());
  }

  public async updateExpenseCategoryName(_id: string, expense: Expense, oldCategoryName: string)
 {
  // new expense has updated category name
  let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
  let category = monthOverviewObject.getCategoryByName(expense.getCategoryName());
  category.addExpense(expense);
  category.getBudget().addToAmountSpentInBudget(expense.getCost());
  let oldCategory = monthOverviewObject.getCategoryByName(oldCategoryName);
  oldCategory.removeExpense(expense);
  oldCategory.getBudget().reduceAmountSpentInBudget(expense.getCost());
  await this.monthOverviewProvider.saveMonthOverview(monthOverviewObject);


 }
}
