
import { Injectable } from '@angular/core';
import { DbProvider } from '../db/db';
import { MonthOverView } from '../../models/monthOverview';
import { ExternalAccount } from '../../models/ExternalAccount';

/*
  Generated class for the MonthOverviewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonthOverviewProvider {

  constructor(public dbProvider: DbProvider) {
    
  }

  /*
  gets the monthOverview with _id in YYYY-MM format
  monthOverview also has _rev associated with it
  */

  getMonthOverview(_id: string): Promise<MonthOverView> {
    return this.dbProvider.getMonthOverview(_id);
  }

  // delegate to dbprovider to save a monthOverview object 
  saveMonthOverview(monthOverview: MonthOverView): void
  {
    this.dbProvider.saveMonthOverview(monthOverview);
  } 

  addExternalAccountToMonthOverview(externalAccount: ExternalAccount)
  {
   // this.getMonthOverview()

  }




}
