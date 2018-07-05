import { CategoryCost } from './../../viewmodels/CategoryCost';
import * as moment from 'moment';

import {
  Injectable
} from '@angular/core';
import PouchDB from 'pouchdb';
import {
  MonthOverView
} from '../../models/monthOverview';
import { Expense } from '../../models/Expense';


/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {
  private db: PouchDB;
  private _id_now; // moment object


  constructor() {
    console.log('Hello DbProvider Provider');
    this._id_now = moment().format('YYYY-MM');
  }

  async setup() {
    this.db = new PouchDB('finance');
    this.getMonthOverview(this._id_now);
  }

  async newMonthOverview(): Promise < MonthOverView > {

    let _id_previousMonth = moment(this._id_now).subtract(1, 'M').format('YYYY-MM');
    try {
      let previousMonthOverview = await this.db.get(_id_previousMonth);
      let previousEndBalance = previousMonthOverview.endBalance;
      let newMonthOverview = new MonthOverView(this._id_now, previousEndBalance);
      await this.db.put(newMonthOverview);
      return newMonthOverview;
    } catch (error) {
      if (error.name === 'not_found') {
        let newMonthOverview = new MonthOverView(this._id_now, 0);
        await this.db.put(newMonthOverview); // surround in catch?
        return newMonthOverview;
      } else {
        console.log('error in putting a new monthoverview', error);
      }

    }

  }


  async getMonthOverview(_id_month: string): Promise < MonthOverView > {
    try {
      return await this.db.get(_id_month);
    } catch (error) {
      if (error.name === 'not_found') {
        return this.newMonthOverview();
      }
    }

  }

  async getRangeOfDateTimes() { // implement range for date time picker via end and start, look at docs
    try {

    } catch (error) {

    }
  }

  async addExpense(_id_month: string, expense: Expense) {
    try {
      let doc = await this.db.get(_id_month);
      doc.expenses.push(expense);
      await this.db.put(doc);
    } catch (error) {
      console.log('error in adding expense');
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

  async getCategoryCosts(_id_month: string){

    let doc = await this.db.get(_id_month);
    let categoryNames = [];
    doc.expenses.forEach(expense => {
      if(categoryNames.findIndex(exp => exp === expense.categoryName) == -1 )
      {
        categoryNames.push(expense.categoryName);
      }
    });
    let categoryCosts = [];
    categoryNames.forEach(categoryName => {
      let categoryTotalCost = 0;
      let filteredExpensesByCategoryName = doc.expenses.filter(expense => expense.categoryName === categoryName);
      filteredExpensesByCategoryName.forEach(expense => {
        categoryTotalCost += expense.cost;
      });
      let newCategoryCost = new CategoryCost(categoryName, categoryTotalCost);
      categoryCosts.push(newCategoryCost);
    });
    return categoryCosts;
    

  }
}
