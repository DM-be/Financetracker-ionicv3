import { DbProvider } from './../db/db';
import { MomentProvider } from './../moment/moment';
import { Category } from './../../models/Category';
import { MonthOverviewProvider } from './../month-overview/month-overview';

import { Injectable } from '@angular/core';

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

  public async updateCategoryIcon(category: Category, iconName: string)
  {
    await this.dbProvider.updateCategoryAndExpensesIconName(category.getCategoryName(), iconName);
  }

  public async updateCategoryColor(category: Category, colorName: string)
  {
    await this.dbProvider.updateCategoryColor(category.getCategoryName(), colorName);
  }

  public async updateCategoryName(category: Category, newCategoryName: string)
  {
    await this.dbProvider.updateCategoryName(category.getCategoryName(), newCategoryName);
  }

  public async getCategories(_id: string): Promise<Category []>
  {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(_id);
    return monthOverview.getCategories();
  }

  public async addCategory(category: Category)
  {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(this._id_now);
    monthOverview.addCategory(category);
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  }

  public async deleteCategory(category: Category) {
    let monthOverview = await this.monthOverviewProvider.getMonthOverview(this._id_now);
    monthOverview.deleteCategory(category);
    await this.monthOverviewProvider.saveMonthOverview(monthOverview);
  }



  

}
