import { Category } from './../../models/Category';
import {
  ExpenseProvider
} from './../../providers/expense/expense';
import {
  AccountProvider
} from './../../providers/account/account';
import {
  Account
} from './../../models/Account';
import {
  MomentProvider
} from './../../providers/moment/moment';
import {
  CategoryProvider
} from './../../providers/category/category';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

import {
  Expense
} from '../../models/Expense';

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
  public newExpense: boolean;
  public categories: Category[];
  public accounts: Account[];
  public expense: Expense;
  public oldExpense: Expense;
  public tags: string[];
  public page = this; // for use in tags
  public selectedYearAndMonth: string; // is set in momentProvider, only updated when top datepicker is selected
  public currentDate_ISO_8601: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryProvider: CategoryProvider, public momentProvider: MomentProvider, public accountProvider: AccountProvider, public expenseProvider: ExpenseProvider) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth();
    this.currentDate_ISO_8601 = this.momentProvider.getCurrentDate_ISO_8601();
    this.expense = this.navParams.get("expense") || new Expense(0,'', this.currentDate_ISO_8601, '', '', '');
    this.editMode = this.navParams.get("editMode");
    this.newExpense = this.navParams.get("newExpense");
    this.tags = this.expense.getTags().map(tag => tag.tagName);
  }

  async ionViewWillEnter() {
    await this.getCategoriesAndAccounts();
    this.bindDateToModel();
    this.oldExpense = new Expense(this.expense.cost, this.expense.description, this.expense.createdDate, this.expense.usedAccountName, this.expense.categoryName, this.expense.iconName, this.expense.tags);
  }

  /* needs to be resynced when changing date, cannot add expense to non existing category in the past */
  async getCategoriesAndAccounts() {
    this.categories = await this.categoryProvider.getCategories(this.selectedYearAndMonth);
    this.accounts = await this.accountProvider.getAccounts(this.selectedYearAndMonth);
  }

  setIconName(categoryName: string) {
    let iconName = this.categories.find(c => c.categoryName === categoryName).getIconName();
    this.expense.setIconName(iconName);
  }

  /* edge case: adding a new expense in a past month --> date is pre filled */
  bindDateToModel() {
    let currentYearAndMonth = this.momentProvider.getFormattedDateInYearAndMonth(this.currentDate_ISO_8601);
    if ((this.selectedYearAndMonth !== currentYearAndMonth) && this.newExpense) {
      let newDateInView = this.momentProvider.getCurrentDateMinusAMonth_ISO_8601();
      this.expense.setCreatedDate(newDateInView);
    }
  }

  async refreshCategoriesAndAccounts() {
    let formattedBoundDate = this.momentProvider.getFormattedDateInYearAndMonth(this.expense.getCreatedDate());
    this.categories = await this.categoryProvider.getCategories(formattedBoundDate);
    this.accounts = await this.accountProvider.getAccounts(formattedBoundDate);
  }

  dismiss() {
    this.navCtrl.pop();
  }

  //todo: add verifying tags code --> no duplicates, no empties, ....
  verifyTag(tag: string): boolean {
    console.log(this)
    return true;
  }
  async updateExpense() {

    let formattedBoundDate = this.momentProvider.getFormattedDateInYearAndMonth(this.expense.getCreatedDate());
    if (this.newExpense) {
      await this.expenseProvider.addExpense(formattedBoundDate, this.expense);
    } else {
      let oldExpenseDateInYearAndMonth = this.momentProvider.getFormattedDateInYearAndMonth(this.oldExpense.getCreatedDate());
      await this.expenseProvider.deleteExpense(oldExpenseDateInYearAndMonth, this.oldExpense);
      await this.expenseProvider.addExpense(formattedBoundDate, this.expense);
    }
  }


}
