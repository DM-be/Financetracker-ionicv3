import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../models/Category';
import { Expense } from '../../models/Expense';

/**
 * Generated class for the ExpensesOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-expenses-overview',
  templateUrl: 'expenses-overview.html',
})
export class ExpensesOverviewPage {
  public category: Category;
  public expenses: Expense [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.category = this.navParams.data.category
  this.expenses = this.category.getExpenses();
  console.log(this.navParams.data)
    

  }

  ionViewWillEnter() {
    
  }

}
