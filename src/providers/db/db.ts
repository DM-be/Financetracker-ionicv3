
import { Category } from './../../models/Category';
import {
  CategoryCost
} from './../../viewmodels/CategoryCost';
import * as moment from 'moment';

import {
  Injectable
} from '@angular/core';
import PouchDB from 'pouchdb';
import {
  MonthOverView
} from '../../models/monthOverview';
import {
  Expense
} from '../../models/Expense';
import { Account } from '../../models/Account';
import { Transaction } from '../../models/Transaction';



/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {
  private db: PouchDB;
  private _id_now; // moment object
  private remote: any;
  private username: string


  constructor() {
    console.log('Hello DbProvider Provider');
    this._id_now = moment().format('YYYY-MM');
    //PouchDB.plugin(pouchdbUpsert);
  }

  initSignIn(details): void {
    this.remote = details.userDBs.supertest;
    this.username = details.user_id;
    this.db = new PouchDB('finance');
    this.db.sync(this.remote).on('complete', () => { // with the live options, complete never fires, so when its in sync, fire an event in the register page
      this.db.sync(this.remote, {
        live: true,
        retry: true, // waiting is overkill?
        continuous: true
      });
    })
  }

  initSignUp(details) {
    this.initSignIn(details);
  }

  // public async setupUserOverview(accounts: Account []) {

  //   try {
  //     let userOverview = new UserOverview(this.username, accounts);
  //     await this.db.put(userOverview);
  //   } catch (error) {
  //     console.log('problem with useroverview setup', error);
  //   }

  // }

  public async setupFirstMonthOverview(accounts: Account[]) {
    try {
      let firstMonthOverview = new MonthOverView(this._id_now, accounts);
      await this.db.put(firstMonthOverview);
    } catch (error) {
      console.log('problem with adding first montoverview', error);
    }
  }

  public async createNewMonthOverview(_id_month) {
    try {
      //let _id_previousMonth = moment(this._id_now).subtract(1, 'M').format('YYYY-MM');
      let _id_previousMonth = moment(_id_month).subtract(1, 'M').format('YYYY-MM');
      let doc = await this.db.get(_id_previousMonth);
      
      doc.accounts.forEach(acc => {
        acc.initialBalance = acc.finalBalance;
      });
      // a get without a put --> dont need to make a copy, just dont put it back in.

      //let newMonthOverview = new MonthOverView(this._id_now, doc.accounts);




      let newMonthOverview = new MonthOverView(doc._id, doc.accounts, doc.categories, doc._rev, doc.usedTags);
      await this.db.put(newMonthOverview);
      return newMonthOverview; // dont always need a return
      // any gotchas? think about it 
    } catch (error) {
      console.log('error in creating a new month overview', error );
    }
  }

  async getMonthOverview(_id_month: string) {
    try {
      return await this.db.get(_id_month);
    } catch (error) {
      console.log(error);
      if (error.name === 'not_found') {
        console.log('did not find month overview, making a new month overview');
        //return await this.createNewMonthOverview(); // use current month!
        return await this.createNewMonthOverview(_id_month); // purely for testing ! 
      }
    }

  }

  // REFACTOR 
  private async addExpenseToCategoryToMonthOverview(_id_month: string, categoryName: string, expense: Expense)
  {
    let doc = await this.db.get(_id_month);
    let monthOverview = new MonthOverView(doc._id, doc.accounts, doc.categories, doc._rev, doc.usedTags);
    let account = monthOverview.getAccByName(expense.getUsedAccountName());
    account.updateFinalBalance('decrease', expense.getCost());


    if(monthOverview.doesContainCategory(categoryName))
    {
      let category = monthOverview.getCategoryByName(categoryName);
      category.addExpense(expense);
      let budget = category.getBudget();
      budget.addToAmountSpentInBudget(expense.getCost()); // always add to amountspent --> when a user decides to add a budget to this category, it will already be tracked 
      monthOverview.addTagsToUsedTags(expense.getTags());
      await this.db.put(monthOverview);
    }
    else {
      let category = new Category(categoryName);
      category.addExpense(expense);
      let budget = category.getBudget();
      budget.addToAmountSpentInBudget(expense.getCost());
      monthOverview.addCategory(category);
      monthOverview.addTagsToUsedTags(expense.getTags());
      await this.db.put(monthOverview);
    }

  } 

  private addTransactionBetweenAccounts(accountA: Account, operationA: string, accountB: Account, operationB: string, amount: number, transactionDate?: string)
  {
    accountA.addTransaction(new Transaction(amount, accountA.getAccountName(), accountB.getAccountName(), operationA, transactionDate));
    accountB.addTransaction(new Transaction(amount, accountA.getAccountName(), accountB.getAccountName(), operationB, transactionDate));
  }

  private updateFinalBalancesBetweenAccounts(accountA: Account, operationA: string, accountB: Account, operationB: string, amount: number, transactionDate?: string)
  {
    // from a to b
    accountA.updateFinalBalance(operationA, amount); // decrease
    accountB.updateFinalBalance(operationB, amount); // increase
    this.addTransactionBetweenAccounts(accountA, operationA, accountB, operationB, amount,transactionDate);
  } 

  private updateFinalAndInitialBalancesBetweenAccounts(accountA: Account, operationA: string, accountB: Account, operationB: string, amount: number)
  {
    accountA.updateInitialBalance(operationA, amount); // decrease
    accountA.updateFinalBalance(operationA, amount);
    accountB.updateInitialBalance(operationB, amount);
    accountB.updateFinalBalance(operationB, amount);
  }

  private addIncomeFromEmployer(employerName: string, recievingAccount: Account, amount: number)
  {
    recievingAccount.updateFinalBalance('increase',amount);
    recievingAccount.addTransaction(new Transaction(amount, employerName, recievingAccount.getAccountName(), '+'));
  }

  public async transferBetweenOwnAccounts(_id_month: string, accountNameA: string, accountNameB: string, amount: number, transactionDate?: string)
  {
    try {
    let doc = await this.db.get(_id_month);
    let monthOverview = new MonthOverView(doc._id, doc.accounts, doc.categories, doc._rev, doc.usedTags);
    let accountA = monthOverview.getAccByName(accountNameA);
    let accountB = monthOverview.getAccByName(accountNameB);
    this.updateFinalBalancesBetweenAccounts(accountA,'decrease', accountB, 'increase', amount, transactionDate);
    await this.db.put(monthOverview);
    } catch (error) {
      console.log('error in transferring funds between accounts',error);
    }
  }
 
  private async updateBalanceInFollowingMonthsAfterTransfer(_id_month: string, accountNameA: string, accountNameB: string, amount: number)
  {
    var _id_monthPlusAmonth = moment(_id_month).add(1,'M').format('YYYY-MM'); 
    var nowPlusAmonth = moment(this._id_now).add(1,'M').format('YYYY-MM');  // refactor in moment provider.
    while (_id_monthPlusAmonth !== nowPlusAmonth  ) {
      let doc = await this.db.get(_id_monthPlusAmonth);
      let monthOverview = new MonthOverView(doc._id, doc.accounts, doc.categories, doc._rev, doc.usedTags);
      let accountA = monthOverview.getAccByName(accountNameA);
      let accountB = monthOverview.getAccByName(accountNameB);
      this.updateFinalAndInitialBalancesBetweenAccounts(accountA, 'decrease', accountB, 'increase', amount);
      await this.db.put(monthOverview, {latest:true, force: true});
      _id_monthPlusAmonth = moment(_id_monthPlusAmonth).add(1, 'M').format('YYYY-MM'); // refactor in moment provider.
    }

  }


  async getRangeOfDateTimes() { // implement range for date time picker via end and start, look at docs
    try {

    } catch (error) {

    }
  }


  private async updateBalanceInFollowingMonths(_id_month: string, expense: Expense)
  {
    var _id_monthPlusAmonth = moment(_id_month).add(1,'M').format('YYYY-MM'); 
    var nowPlusAmonth = moment(this._id_now).add(1,'M').format('YYYY-MM');  // refactor in moment provider.
    while (_id_monthPlusAmonth !== nowPlusAmonth  ) {
      let doc = await this.db.get(_id_monthPlusAmonth);
      let monthOverview = new MonthOverView(doc._id, doc.accounts, doc.expenses, doc._rev);
      let account = monthOverview.getAccByName(expense.getUsedAccountName());
      account.updateFinalBalance('decrease', expense.getCost());
      account.updateInitialBalance('decrease', expense.getCost());
      await this.db.put(monthOverview, {latest:true, force: true});  // MAYBE SYNC MANUALLY....
      _id_monthPlusAmonth = moment(_id_monthPlusAmonth).add(1, 'M').format('YYYY-MM'); // refactor in moment provider.
    }
  }
  
  public async addExpenses(_id_month: string, expense: Expense, categoryName: string) {
    try {
      this.addExpenseToCategoryToMonthOverview(_id_month, categoryName, expense );
      if(_id_month !== this._id_now)
      {
        console.log('updating balances in following months');
        this.updateBalanceInFollowingMonths(_id_month, expense);
      }
      
    } catch (error) {
      console.log('error in adding expenses', error);
    }

  }

  public async addTransfer(_id_month: string, accountNameA: string, accountNameB: string, amount: number, transactionDate: string)
  {
    try {
      this.transferBetweenOwnAccounts(_id_month, accountNameA, accountNameB, amount, transactionDate);
      if(_id_month !== this._id_now)
      {
        this.updateBalanceInFollowingMonthsAfterTransfer(_id_month, accountNameA,accountNameB, amount );
        console.log('updating balances in following months after a transfer');


      }
    } catch (error) {
      
    }
  }

  async getExpensesByCategoryName(categoryName: string) {

  }

  async getTotalExpenseCostByMonth(_id_month) {
    try {
      let doc = await this.db.get(_id_month);
      let totalCost: number;
      doc.expenses.forEach(expense => {
        totalCost += expense.cost;
      });
    } catch (err) {
      console.log(err);
    }
  }

  // beware multiple db calls
  async getTotalExpenseCostByMonthAndCategoryName(_id_month: string, categoryName: string) {
    let doc = await this.db.get(_id_month);

    let filteredExpenses = doc.expenses.filter(expense => expense.categoryName === categoryName);
    let totalCost: number;
    filteredExpenses.forEach(expense => {
      totalCost += expense.cost;
    });

  }



  async getCategoryCosts(_id_month: string) {

    let doc = await this.db.get(_id_month);
    let categoryNames = [];
    doc.expenses.forEach(expense => {
      if (categoryNames.findIndex(exp => exp === expense.categoryName) == -1) {
        categoryNames.push(expense.categoryName);
      }
    });
    let categoryCosts = [];
    categoryNames.forEach(categoryName => {
      let categoryTotalCost = 0;
      let expenses = [];
      let filteredExpensesByCategoryName = doc.expenses.filter(expense => expense.categoryName === categoryName);
      filteredExpensesByCategoryName.forEach(expense => {
     //   let expenseObject = new Expense(expense.categoryName, expense.cost, expense.description, expense.dateCreated);
      //  expenses.push(expenseObject);
        categoryTotalCost += expense.cost;
      });
      let newCategoryCost = new CategoryCost(categoryName, categoryTotalCost, expenses);
      categoryCosts.push(newCategoryCost);
    });
    return categoryCosts;


  }
}
