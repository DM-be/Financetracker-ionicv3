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
  public ex = new Expense('test', 0, 'test');
  constructor(public navCtrl: NavController, public dbProvider: DbProvider) {
   // this.ex = new Expense('', 0, '');
    this._id_now = moment().format('YYYY-MM');
  }

  addExpense() {
    this.ex.cost = parseInt(this.ex.cost);
    this.dbProvider.addExpense(this._id_now, this.ex);
    console.log('added expense');
    console.log(this.ex);
  }

}
