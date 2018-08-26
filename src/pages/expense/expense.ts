import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { Expense } from '../../models/Expense';
import { Tag } from '../../models/Tag';
import { MonthOverView } from '../../models/monthOverview';
import { Category } from '../../models/Category';


/**
 * Generated class for the ExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',
})
export class ExpensePage {

  public _id_now: string;
  public description: string;
  public categoryName: string;
  public cost: string;
  public usedAccount: string;
  public selectedDate;
  public tags: Tag [];
  public newTag: string;
  public chartColor: string;
  public categories: Category [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider) {
    this.categories = this.navParams.get("categories");
    
    this._id_now = moment().format('YYYY-MM');
    this.selectedDate = moment().format('YYYY-MM');
    this.tags = [];
  }

  public addTag(ev) {
    this.tags.push(new Tag(this.newTag, this.selectedDate));
    this.newTag = "";
  }

  public deleteTag(i) {
    this.tags.splice(i,1);
  }

  public categoryDoesNotExist(categoryName: string)
  {
    return (this.categories.findIndex(c => c.getCategoryName() === categoryName) === -1)
  }

  setColor(ev: string)
  {
    this.chartColor = ev;
    console.log(this.chartColor);
  }



  addExpense() {

    let expense = new Expense(parseInt(this.cost), this.description, moment().format(), this.usedAccount, this.categoryName, '',this.tags);
    //this.dbProvider.addExpenses(this.selectedDate, expense, this.categoryName, this.chartColor);

  }

  compareFn(e1: Category, e2: Category): boolean {
    return e1 && e2 ? e1.categoryName === e2.categoryName : e1 === e2;
  }
}
