import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import { Expense } from '../../models/Expense';
import { Tag } from '../../models/Tag';


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
  public selectedDate;
  public tags: Tag [];
  public newTag: string;

  constructor(public navCtrl: NavController, public dbProvider: DbProvider) {
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

  addExpense() {

    let expense = new Expense(parseInt(this.cost), this.description, moment().format(), this.usedAccount, this.tags);
    this.dbProvider.addExpenses(this.selectedDate, expense, this.categoryName);

  }

}
