import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import { Expense } from '../../models/Expense';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public _id_now: string;
  public description: string;
  public categoryName: string;
  public cost: string;
  public usedAccount: string;

  constructor(public navCtrl: NavController, public dbProvider: DbProvider) {
    this._id_now = moment().format('YYYY-MM');
  }

  addExpense() {

    let expense = new Expense(this.categoryName, parseInt(this.cost), this.description, moment().format(), this.usedAccount);
    this.dbProvider.addExpense(this._id_now, expense);
    console.log('added expense');
    console.log(expense);
  }

}
