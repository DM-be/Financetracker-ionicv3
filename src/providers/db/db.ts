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
import { UserOverview } from '../../models/UserOverview';


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

  public async setupUserOverview(accounts: Account []) {

    try {
      let userOverview = new UserOverview(this.username, accounts);
      await this.db.put(userOverview);
    } catch (error) {
      console.log('problem with useroverview setup', error);
    }

  }

  public async setupFirstMonthOverview(accounts: Account[]) {
    try {
      let firstMonthOverview = new MonthOverView(this._id_now, accounts);
      await this.db.put(firstMonthOverview);
    } catch (error) {
      console.log('problem with adding first montoverview', error);
    }
  }

  public async createNewMonthOverview() {
    try {
      let _id_previousMonth = moment(this._id_now).subtract(1, 'M').format('YYYY-MM');
      let {accounts} = await this.db.get(_id_previousMonth);
      accounts.forEach(acc => {
        acc.initialBalance = acc.finalBalance;
      });
      let newMonthOverview = new MonthOverView(this._id_now, accounts);
      await this.db.put(newMonthOverview);
      return newMonthOverview; // dont always need a return
      // any gotchas? think about it 
    } catch (error) {
      console.log('error in creating a new month overview');
    }
  }

  async getMonthOverview(_id_month: string) {
    try {
      return await this.db.get(_id_month);
    } catch (error) {
      console.log(error);
      if (error.name === 'not_found') {
        console.log('did not find, making new month overview');
        return await this.createNewMonthOverview();
      }
    }

  }


 
 

  async getRangeOfDateTimes() { // implement range for date time picker via end and start, look at docs
    try {

    } catch (error) {

    }
  }

  private async addExpenseToMonthOverview(_id_month, expense: Expense) {
    try {
      let doc = await this.db.get(_id_month);
      let account = doc.accounts.find((account) => account.accountName === expense.usedAccount);
      account.finalBalance = account.finalBalance - expense.cost;
      doc.expenses.push(expense);
      await this.db.put(doc);
    } catch (error) {
      console.log('error in adding expense to month overview', error);
    }

  }

  private async addExpenseToUserOverview(expense: Expense) 
  {
    try {
      let doc = await this.db.get(this.username);
      let account = doc.accounts.find((account) => account.accountName === expense.usedAccount);
      account.finalBalance = account.finalBalance - expense.cost;
      await this.db.put(doc);
    } catch (error) {
      console.log('error in adding expense to user overview', error);
    }
  }
  
  
  async addExpenses(_id_month: string, expense: Expense) {
    try {
      this.addExpenseToMonthOverview(_id_month, expense);
      this.addExpenseToUserOverview(expense);
    } catch (error) {
      console.log('error in adding expenses', error);
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
