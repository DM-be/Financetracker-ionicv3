import { ExpenseProvider } from './../../providers/expense/expense';
import { MomentProvider } from './../../providers/moment/moment';
import { ExpensesOverviewPage } from './../expenses-overview/expenses-overview';
import {
  CategoryOptionsPage
} from './../category-options/category-options';
import {
  Budget
} from './../../models/Budget';
import {
  ModalProvider
} from '../../providers/modal/modal';
import {
  AccountsPopoverPage
} from './../accounts-popover/accounts-popover';
import {
  Component,
  Inject,
  forwardRef
} from '@angular/core';
import {
  NavController,
  ModalController,
  PopoverController
} from 'ionic-angular';
import * as moment from 'moment';
import {
  DbProvider
} from '../../providers/db/db';
import {
  Category
} from '../../models/Category';
import Chart from 'chart.js';
import {
  ExpensePage
} from '../expense/expense';
import {
  Expense
} from '../../models/Expense';
import {
  Account
} from '../../models/Account';
import {
  MonthOverView
} from '../../models/monthOverview';
import {
  CategoryDetailsPage
} from '../category-details/category-details';
import {
  ExpenseDetailPage
} from '../expense-detail/expense-detail';
import {
  AccountDetailsPage
} from '../account-details/account-details';
import {
  CategoryPage
} from '../category/category';
import {
  TransferPage
} from '../transfer/transfer';
import {
  TransferExternalPage
} from '../transfer-external/transfer-external';
import {
  MonthOverviewProvider
} from '../../providers/month-overview/month-overview';


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

  public selectedYearAndMonth: string;
  public categories: Category[];
  public expenses: Expense[];
  public accounts: Account[];
  public monthOverviewObject: MonthOverView;
  public minDate: string;
  public maxDate: string;


  constructor(public navCtrl: NavController, public dbProvider: DbProvider, public monthOverviewProvider: MonthOverviewProvider, public modalCtrl: ModalController,
    public popoverCtrl: PopoverController, public momentProvider: MomentProvider, public expenseProvider: ExpenseProvider) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth() || this.momentProvider.getCurrentYearAndMonth();
  }

 
  async refreshData() {

    
      this.monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
      this.categories = this.monthOverviewObject.getCategories();
      this.expenses = this.monthOverviewObject.getAllExpenses();
      this.accounts = this.monthOverviewObject.getAllAccounts();
    

    
  }
  async updateDate() {
    await this.refreshData();
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
    // await this.dbProvider.getCategoryCosts(this.selectedDate);
  }

  async ionViewWillEnter() {
    await this.refreshData();
    // let data  = this.buildData(this.categories);
    // this.buildChart(data);
  }

  buildData(categories: Category[]) {
    let data = [];
    categories.forEach(category => {
      data.push(category.getBudget().currentAmountSpent);
    });
    return data;
  }

  buildChart(data) {
    var ctx = document.getElementById("myChart");
    var chartData = {
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

    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: Chart.defaults.doughnut
    });


  }

  loadProgress(budget: Budget) {
    let percentage = (budget.currentAmountSpent / budget.limitAmount) * 100;
    if(percentage <= 100)
    {
      return percentage;
    }
    return 100;
  }

  public getBudgetBarColor(percentage: number):string {
      if (percentage < 60) {
        return "#8BC34A"
        
      } else if (percentage < 80 ){
        return "#FF9800";
      }
      return "#F44336";
  }

  showCategoryDetails(category: Category) {
    this.navCtrl.push(ExpensesOverviewPage, {
        category: category,
      }
    );
  }

  showCategoryOptions(category: Category) {
    this.navCtrl.push(CategoryOptionsPage, 
      {
        category: category,
      }
    );
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(AccountsPopoverPage);
    console.log(myEvent);
    popover.present({
      ev: myEvent
    });


  }


  addExpenseModal() {
    let expenseModal = this.modalCtrl.create(ExpenseDetailPage, {
      editMode: true,
      newExpense: true
    });
    expenseModal.present();
  }

  addAccountModal() {
    //this.modalProvider.displayAddAccountModal();
  }

  detailExpenseModal(expense: Expense, editMode ? : any) {
    let detailExpenseModal = this.navCtrl.push(ExpenseDetailPage, {
      expense: expense,
      categories: this.categories,
      editMode: editMode,
    })
    //  detailExpenseModal.present();
  }

  async deleteExpense(expense: Expense) {
    await this.expenseProvider.deleteExpense(this.selectedYearAndMonth, expense);
    await this.refreshData();
  }


  accountsDetailPage(account: Account) {

    this.navCtrl.push(AccountDetailsPage, {
      account: account,
      expenses: this.monthOverviewObject.getExpensesByAccountName(account.accountName),
      categories: this.categories
    });
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





  // handleSwipe($e) {
  //   if ($e.offsetDirection == 4) {
  //     // Swiped right
  //     this.selectedDate = moment(this.selectedDate).subtract(1, 'M').format('YYYY-MM');
  //   } else if ($e.offsetDirection == 2) {
  //     // Swiped left
  //     this.selectedDate = moment(this.selectedDate).add(1, 'M').format('YYYY-MM');
  //   } else if ($e.offsetDirection == 8) {
  //     // swiped up
  //     let dateToTest = moment(this.selectedDate).add(1, 'years').format('YYYY');
  //     let now = moment().format('YYYY');
  //     if (dateToTest <= now) {
  //       this.selectedDate = moment(this.selectedDate).add(1, 'years').format('YYYY-MM');
  //     }
  //   } else if ($e.offsetDirection == 16) {
  //     // swiped down
  //     this.selectedDate = moment(this.selectedDate).subtract(1, 'years').format('YYYY-MM');
  //   }
  // }


}
