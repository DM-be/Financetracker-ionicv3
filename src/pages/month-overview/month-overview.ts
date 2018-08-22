import { ModalProvider } from '../../providers/modal/modal';
import { AccountsPopoverPage } from './../accounts-popover/accounts-popover';
import { Component, Inject, forwardRef } from '@angular/core';
import {NavController, ModalController, PopoverController } from 'ionic-angular';
import * as moment from 'moment';
import { DbProvider } from '../../providers/db/db';
import { Category } from '../../models/Category';
import Chart from 'chart.js';
import { ExpensePage } from '../expense/expense';
import { Expense } from '../../models/Expense';
import { Account } from '../../models/Account';
import { MonthOverView } from '../../models/monthOverview';
import { CategoryDetailsPage } from '../category-details/category-details';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { AccountDetailsPage } from '../account-details/account-details';
import { CategoryPage } from '../category/category';
import { TransferPage } from '../transfer/transfer';
import { TransferExternalPage } from '../transfer-external/transfer-external';
import { MonthOverviewProvider } from '../../providers/month-overview/month-overview';


/**
 * Generated class for the MonthOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-month-overview',
  templateUrl: 'month-overview.html',
})
export class MonthOverviewPage {

  public selectedDate: string;
  public categories: Category [];
  public expenses: Expense [];
  public accounts: Account [];
  public monthOverviewObject: MonthOverView;


  constructor(public navCtrl: NavController, public dbProvider: DbProvider, public monthOverviewProvider: MonthOverviewProvider, public modalCtrl: ModalController,
  public popoverCtrl: PopoverController) {
    this.selectedDate = moment().format('YYYY-MM');    
  }

  

  async updateDate() {
    await this.dbProvider.getMonthOverview(this.selectedDate);
   // await this.dbProvider.getCategoryCosts(this.selectedDate);
  }

  async ionViewWillEnter() {
    this.monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(this.selectedDate);
    let monthOverviewObject =this.monthOverviewObject;
    this.categories = monthOverviewObject.getCategories();
    this.expenses = monthOverviewObject.getAllExpenses();
    this.accounts = monthOverviewObject.getAllAccounts();
   // let data  = this.buildData(this.categories);
   // this.buildChart(data);
  }

  buildData(categories: Category []) {
    let data = [];
    categories.forEach(category => {
      data.push(category.getBudget().currentAmountSpent);
    });
    return data;
  }

  buildChart(data) {
    var ctx = document.getElementById("myChart");
    var chartData ={
      datasets: [{
          data: data
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Red',
          'Yellow',
          'Blue'
      ]
  };

    var myPieChart = new Chart(ctx,{
      type: 'pie',
      data: chartData,
      options: Chart.defaults.doughnut
  });

    
  }

  loadProgress() {
    return 30;
  }

  showCategoryDetails(category: Category)
  {
    this.navCtrl.push(CategoryDetailsPage, {
      category: category,
      selectedDate: this.selectedDate
    });
    
  } 
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(AccountsPopoverPage);
    console.log(myEvent);
    popover.present({
      ev: myEvent
    });
    
    
  }


  addExpenseModal() {
    let expenseModal = this.modalCtrl.create(ExpensePage, {
      "categories": this.categories
    });
    expenseModal.present();
  }

  addAccountModal() {
    //this.modalProvider.displayAddAccountModal();
  }

  detailExpenseModal(expense: Expense, editMode?: any) {
    let detailExpenseModal = this.navCtrl.push(ExpenseDetailPage, {
      expense: expense,
      categories: this.categories,
      editMode: editMode
    })
  //  detailExpenseModal.present();
  } 
  accountsDetailPage(account: Account) {
    
    this.navCtrl.push(AccountDetailsPage, {
      account: account, 
      expenses: this.monthOverviewObject.getExpensesByAccountName(account.accountName),
      categories: this.categories});
  }

  addCategoryModal() {
    let categoryModal = this.modalCtrl.create(CategoryPage);
    categoryModal.present();
  }

  transferAccountsModal() {
    this.modalCtrl.create(TransferPage).present();
  }

  transferExternalAccountsModal() {
    this.modalCtrl.create(TransferExternalPage).present();
  }

  

 

  handleSwipe($e) {
    if ($e.offsetDirection == 4) {
      // Swiped right
      this.selectedDate = moment(this.selectedDate).subtract(1, 'M').format('YYYY-MM');
    } else if ($e.offsetDirection == 2) {
      // Swiped left
      this.selectedDate = moment(this.selectedDate).add(1, 'M').format('YYYY-MM');
    }
    else if ($e.offsetDirection == 8)
    {
      // swiped up
      let dateToTest = moment(this.selectedDate).add(1, 'years').format('YYYY');
      let now = moment().format('YYYY');
      if(dateToTest <= now)
      {
         this.selectedDate = moment(this.selectedDate).add(1, 'years').format('YYYY-MM');
      }
    }
    else if($e.offsetDirection == 16)
    {
      // swiped down
      this.selectedDate = moment(this.selectedDate).subtract(1, 'years').format('YYYY-MM');
    }
  }


}
