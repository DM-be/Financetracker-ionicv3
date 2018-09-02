import { AccountProvider } from './../../providers/account/account';
import { Account } from './../../models/Account';
import { MomentProvider } from './../../providers/moment/moment';
import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../models/Category';
import { Expense } from '../../models/Expense';

/**
 * Generated class for the ExpenseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-expense-detail',
  templateUrl: 'expense-detail.html',
})
export class ExpenseDetailPage {

  public editMode: boolean;
  public categories: Category [];
  public accounts: Account [];
  public expense: Expense;
  public tags: string [];
  public page = this;
  public selectedYearAndMonth: string; // is set in momentProvider, only updated when top datepicker is selected
  public currentDate_ISO_8601: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryProvider: CategoryProvider, public momentProvider: MomentProvider, public accountProvider: AccountProvider) {
  this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth();
  this.currentDate_ISO_8601 = this.momentProvider.getCurrentDate_ISO_8601();
  this.expense = this.navParams.get("expense") || new Expense(0, '', this.currentDate_ISO_8601, '', '', '');
  this.editMode = this.navParams.get("editMode");
  this.tags = this.expense.getTags().map(tag => tag.tagName);
  }

  
  async ionViewWillEnter() {
    await this.getCategoriesAndAccounts();
    this.bindDateToModel();
    
  }
  
  bindDateToModel() {
    let currentYearAndMonth = this.momentProvider.getFormattedDateInYearAndMonth(this.currentDate_ISO_8601);
    if(this.selectedYearAndMonth !== currentYearAndMonth)
    {
      this.expense.setCreatedDate('');
    }
  }


  async getCategoriesAndAccounts()
  {
    this.categories = await this.categoryProvider.getCategories(this.selectedYearAndMonth);
    this.accounts = await this.accountProvider.getAccounts(this.selectedYearAndMonth);
  }

  dismiss() {
    this.navCtrl.pop();
  }

  verifyTag(tag: string): boolean
  {
    console.log(this)
    return true;

  }
  updateExpense() {
  }

  
  /* 

  todo: check if usedAccount changed (best via formcontrol or touched etc, see docs)
  1: if changed --> use the initial usedAccount and increment cost of expense
  2: delete expense from the account
  3: decrement new account balance with expense cost
  4: save new monthObject

  todo: if the month of the date is not the same as the current month
  1: check first todo
  2: 
    
  */

 

}
