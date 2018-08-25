import { Budget } from './../../models/Budget';
import { Category } from './../../models/Category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the BudgetOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-budget-overview',
  templateUrl: 'budget-overview.html',
})
export class BudgetOverviewPage {


  public budget: Budget;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
   // this.budget = this.category.getBudget();
   this.budget = new Budget();
  }

  updateLimitAmount() {
  }

  addNewBudget() {
  this.modalCtrl.create  
  this.budget.limitAmount = 0;
  }

}
