import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpensesOverviewPage } from '../expenses-overview/expenses-overview';
import { BudgetOverviewPage } from '../budget-overview/budget-overview';
import { Category } from '../../models/Category';

/**
 * Generated class for the CategoryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-category-details',
  templateUrl: 'category-details.html',
})
export class CategoryDetailsPage {

  public expensesOverview = ExpensesOverviewPage;
  public budgetOverview = BudgetOverviewPage;
  public customData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.customData = this.navParams.get("customData");
    console.log(this.customData)

  }


}
