import { MonthOverView } from './../../models/MonthOverview';
import { DbProvider } from './../db/db';
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

  constructor(public monthOverviewProvider: MonthOverviewProvider, public momentProvider: MomentProvider, public dbProvider: DbProvider) {
  }

  public async getExpenses(_id: string, categoryName: string) {
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    return monthOverviewObject.getExpensesByCategoryName(categoryName);
  }

  public async deleteExpense(_id: string, expense: Expense)
  {
    let parsedIntCost = parseInt(expense.getCost()); // bound in model is a string
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    let category = monthOverviewObject.getCategoryByName(expense.getCategoryName());
    category.removeExpense(expense);
    category.getBudget().reduceAmountSpentInBudget(parsedIntCost);
    monthOverviewObject.getAccByName(expense.getUsedAccountName()).updateFinalBalance('increase', parsedIntCost);
    await this.monthOverviewProvider.saveMonthOverview(monthOverviewObject);
  }

  public async editExpense(_id: string, categoryName, expense: Expense)
  {
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    let category = monthOverviewObject.getCategoryByName(categoryName);
    category.replaceExpense(expense);
    await this.monthOverviewProvider.saveMonthOverview(monthOverviewObject);
  }
  
  public async addExpense(_id: string, expense: Expense, oldCategoryName?: string, oldAccountName?: string)
  {
    let parsedIntCost = parseInt(expense.getCost()); // bound in model is a string
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    let category = monthOverviewObject.getCategoryByName(expense.getCategoryName());
    category.addExpense(expense);
    category.getBudget().addToAmountSpentInBudget(parsedIntCost);
    if(oldCategoryName)
    {
      // case: updating categoryname requires removal of the expense in the old category
      let oldCategory = monthOverviewObject.getCategoryByName(oldCategoryName);
      oldCategory.removeExpense(expense);
      oldCategory.getBudget().reduceAmountSpentInBudget(parsedIntCost);
    }
    // case: updating categoryname in the past, has no effect on balances

    if(oldAccountName) 
    {
      // increase A
      let account = monthOverviewObject.getAccByName(expense.getUsedAccountName())
      account.updateFinalBalance('increase', parsedIntCost);
      // decrease B
      let oldAccount = monthOverviewObject.getAccByName(oldAccountName);
      oldAccount.updateFinalBalance('decrease', parsedIntCost);
      if(_id !== this.momentProvider.getCurrentYearAndMonth())
      {
        // now initial balances following months of oldaccount/B are incorrect
        // now initial balances following months of account A are incorrect
        this.updateExpenseCostInInitialBalanceInFollowingMonths(_id, parsedIntCost, account.getAccountName(), 'increase');
        this.updateExpenseCostInInitialBalanceInFollowingMonths(_id, parsedIntCost, oldAccount.getAccountName(), 'decrease');
      }
    }
    else {
      //A
      let account = monthOverviewObject.getAccByName(expense.getUsedAccountName())
      account.updateFinalBalance('decrease', parsedIntCost);
      if(_id !== this.momentProvider.getCurrentYearAndMonth())
      {
        this.updateExpenseCostInInitialBalanceInFollowingMonths(_id, parsedIntCost, account.getAccountName(), 'decrease');
        // initial balances in following months
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


  public async updateExpenseCostInInitialBalanceInFollowingMonths(_id: string, cost: number, accountName: string, operation: string)
  {
    let newDocs: MonthOverView[] = [];
    let allDocs = await this.dbProvider.getDb().allDocs({
      include_docs: true,
      startkey: _id
    });
    allDocs.rows.forEach(mo => {
      let monthOverviewObJect = new MonthOverView(mo.doc._id, mo.doc.accounts, mo.doc.categories, mo.doc._rev, mo.doc.usedTags);
      let account = monthOverviewObJect.getAccByName(accountName);
      account.updateInitialBalance(operation, cost);
      newDocs.push(monthOverviewObJect);
      }
    );
    await this.dbProvider.getDb().bulkDocs({docs: newDocs});

  }
}
