
import { Injectable } from '@angular/core';
import { DbProvider } from '../db/db';
import { MonthOverView } from '../../models/monthOverview';

/*
  MontOverviewProvider is in charge of retrieving/saving monthOverviewObjects with dbProvider
*/
@Injectable()

export class MonthOverviewProvider {

  constructor(public dbProvider: DbProvider) {}

  /*
  gets the monthOverview with _id in YYYY-MM format
  monthOverview also has _rev associated with it
  */
  getMonthOverview(_id: string): Promise<MonthOverView> {
    return this.dbProvider.getMonthOverview(_id);
  }
  // delegate to dbprovider to save a monthOverview object 
  saveMonthOverview(monthOverview: MonthOverView) {
    this.dbProvider.saveMonthOverview(monthOverview);
  }
 
}
