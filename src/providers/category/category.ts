import {
  MonthOverView
} from './../../models/MonthOverview';
import {
  DbProvider
} from './../db/db';
import {
  MomentProvider
} from './../moment/moment';
import {
  Category
} from './../../models/Category';
import {
  MonthOverviewProvider
} from './../month-overview/month-overview';

import {
  Injectable
} from '@angular/core';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  public _id_now; // always in the present
  // adding a category in the past will not allow you to add expenses in that month

  constructor(public monthOverviewProvider: MonthOverviewProvider, public dbProvider: DbProvider, public momentProvider: MomentProvider) {
    this._id_now = this.momentProvider.getCurrentYearAndMonth();
  }

  public async updateCategoryIcon(category: Category, iconName: string) {
    await this.dbProvider.updateCategoryAndExpensesIconName(category.getCategoryName(), iconName);
  }

  public async updateCategoryColor(category: Category, colorName: string) {
    await this.dbProvider.updateCategoryColor(category.getCategoryName(), colorName);
  }

  public async updateCategoryName(category: Category, newCategoryName: string) {
    await this.dbProvider.updateCategoryName(category.getCategoryName(), newCategoryName);
  }

  public async getCategories(_id: string): Promise < Category[] > {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(_id);
    return monthOverview.getCategories();
  }

  public async addCategory(category: Category) {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(this._id_now);
    monthOverview.addCategory(category);
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  }

  public async deleteCategory(category: Category) {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(this._id_now);
    monthOverview.deleteCategory(category);
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  }

  //   public async getCategoriesBetweenDates(from: string, to: string)
  //   {
  //     let categories: Category[] = [];
  //     let allDocs = await this.dbProvider.getDb().allDocs({
  //       include_docs: true,
  //       startkey: from,
  //       endKey: to
  //     });
  //     allDocs.rows.forEach(mo => {
  //       let monthOverviewObJect = new MonthOverView(mo.doc._id, mo.doc.accounts, mo.doc.categories, mo.doc._rev, mo.doc.usedTags);
  //       categories.push(monthOverviewObJect.getCategories());


  //   }
  // }


  /*
  returns a single dataset number array with each index containing the same category total/average/... cost
  over a timeperiod, with labels: months of the year
  example
  [100, 0, 300, 400] for category:hobby --> from jan to april
  
  */

  public async getCategoryDatasetWithMonthLabel(from: string, to: string, labelType: string, categoryName: string, operation: string) {
    let resultingData: number[] = [];
    let allDocs = await this.dbProvider.getDb().allDocs({
      include_docs: true,
      startkey: from,
      endKey: to
    });
    allDocs.rows.forEach(mo => {
      let monthOverviewObJect = new MonthOverView(mo.doc._id, mo.doc.accounts, mo.doc.categories, mo.doc._rev, mo.doc.usedTags);
      if (operation === 'total' && labelType === 'month') {
        if (monthOverviewObJect.containsCategory(categoryName)) {
          resultingData.push(monthOverviewObJect.getCategoryByName(categoryName).getTotalExpenseCost());
        } else {
          resultingData.push(0);
        }
      }
    })
    return resultingData;
  }



  /*

  aggregates category numbers based on operation
  returns a single dataset with each index having a computed number, depending on operation and time period
  example
  [500, 300]
  --> hobby: 500 total cost, food: 300 total cost, from period jan to feb
  */

  public async getCategoryDatasetWithCategoryLabel(from: string, to: string, categories: Category[], operation: string) {
    let resultingData: number[] = [];
    for (let i = 0; i < categories.length; i++) {
      resultingData[i] = 0;
    }
    let allDocs = await this.dbProvider.getDb().allDocs({
      include_docs: true,
      startkey: from,
      endKey: to
    });
    allDocs.rows.forEach(mo => {
      let monthOverviewObJect = new MonthOverView(mo.doc._id, mo.doc.accounts, mo.doc.categories, mo.doc._rev, mo.doc.usedTags);
      if (operation === 'total') {
        monthOverviewObJect.getCategories().forEach(cat => {
          let i = categories.findIndex(c => c.categoryName === cat.categoryName);
          if (i >= 0) {
            resultingData[i] += cat.getTotalExpenseCost();
          }
        });
      }
    })
    return resultingData;
  }







}
