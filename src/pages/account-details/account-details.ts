import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Transaction } from '../../models/Transaction';
import { Expense } from '../../models/Expense';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { Account } from '../../models/Account';
import { Category } from '../../models/Category';

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})

// TODO: make a pipe for date formatting!
export class AccountDetailsPage {

  public account: Account;
  public expenses: Expense [];
  public transactions: Transaction [];
  public categories: Category [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.account = this.navParams.get("account");
    this.expenses = this.navParams.get("expenses");
    this.categories = this.navParams.get("categories");
    console.log(this.categories)




    
    
    
  }

  ionViewDidEnter(){
   this.transactions = this.account.getTransactions();
  }

 

  detailExpenseModal(expense: Expense, editMode?: any) {

    console.log(expense);
    let detailExpenseModal = this.modalCtrl.create(ExpenseDetailPage, {
      expense: expense,
      categories: this.categories,
      editMode: editMode
    })
    detailExpenseModal.present();
  } 

  getOperationSign(operation:string): string {
    if(operation === 'increase')
    {
      return '+';
    }
    return '-'
  }

  

}
