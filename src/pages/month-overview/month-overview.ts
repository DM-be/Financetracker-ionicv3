import {
  ChartBudgetPage
} from './../chart-budget/chart-budget';
import {
  ExpenseProvider
} from './../../providers/expense/expense';
import {
  MomentProvider
} from './../../providers/moment/moment';
import {
  ExpensesOverviewPage
} from './../expenses-overview/expenses-overview';
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
import {
  AccountsPage
} from '../accounts/accounts';


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

  async ionViewWillEnter(): Promise < void > {
    await this.refreshData();
  }

  async refreshData(): Promise < void > {
    this.monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
    this.categories = this.monthOverviewObject.getCategories();
    this.expenses = this.monthOverviewObject.getAllExpenses();
    this.accounts = this.monthOverviewObject.getAllAccounts();
  }

  async updateDate(): Promise < void > {
    await this.refreshData();
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
  }

  public loadProgress(budget: Budget): number {
    let percentage = (budget.currentAmountSpent / budget.limitAmount) * 100;
    if (percentage <= 100) {
      return percentage;
    }
    return 100;
  }

  public getBudgetBarColor(percentage: number): string {
    if (percentage < 60) {
      return "#8BC34A"

    } else if (percentage < 80) {
      return "#FF9800";
    }
    return "#F44336";
  }

  showCategoryDetails(category: Category) {
    this.navCtrl.push(ExpensesOverviewPage, {
      category: category,
    });
  }

  showCategoryOptions(category: Category) {
    this.navCtrl.push(CategoryOptionsPage, {
      category: category,
    });
  }

  public addAccountModal(): void {
    this.modalCtrl.create(AccountsPage, undefined, {
      cssClass: 'alertModal'
    }).present();
  }

  public detailExpenseModal(expense?: Expense, editMode ? : boolean, newExpense?: boolean): void {
    this.modalCtrl.create(ExpenseDetailPage, {
      expense: expense,
      editMode: editMode,
      newExpense: newExpense
    },{
      cssClass: 'alertModal'
    }).present();
  }

  async deleteExpense(expense: Expense): Promise < void > {
    await this.expenseProvider.deleteExpense(this.selectedYearAndMonth, expense);
    await this.refreshData();
  }

  public accountsDetailPage(account: Account): void {
    this.navCtrl.push(AccountDetailsPage, {
      account: account,
      expenses: this.monthOverviewObject.getExpensesByAccountName(account.accountName),
      categories: this.categories
    });
  }

  public addCategoryModal(): void {
    let categoryModal = this.modalCtrl.create(CategoryPage, undefined, {
      cssClass: 'alertModal'
    });
    categoryModal.present();
  }

  public chartBudgetModal(expenses: Expense[]): void {
    this.modalCtrl.create(ChartBudgetPage, {
      expenses: expenses,
    }, {
      cssClass: 'alertModal'
    }).present();

  }

  public transferAccountsModal(): void {
    this.modalCtrl.create(TransferPage, undefined, {
      cssClass: 'alertModal'
    }).present();
  }

  public transferExternalAccountsModal(): void {
    this.modalCtrl.create(TransferExternalPage, undefined, {
      cssClass: 'alertModal'
    }).present();
  }

}
