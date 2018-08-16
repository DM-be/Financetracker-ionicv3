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
  public expense: Expense;
  public tags: any = [];
  public page = this;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = this.navParams.get("categories");
    this.expense = this.navParams.get("expense");
    this.tags = this.expense.getTags().map(tag => tag.tagName);
    console.log(this.expense.getCategoryName())
    
  }

  ionViewWillEnter() {
    this.editMode = this.navParams.get("editMode");
    console.log(this.categories)
   

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
