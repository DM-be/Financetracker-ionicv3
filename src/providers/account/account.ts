import { MonthOverviewProvider } from './../month-overview/month-overview';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbProvider } from '../db/db';
import { MonthOverView } from '../../models/monthOverview';
import { Account } from '../../models/Account';
import { ExternalAccount } from '../../models/ExternalAccount';

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {
  

  constructor(public dbProvider: DbProvider, public monthOverviewProvider: MonthOverviewProvider) {
  }

  async getAccounts(_id: string)
  {
    let monthOverview: MonthOverView = await this.dbProvider.getMonthOverview(_id);
    return monthOverview.getAllAccounts();
  }
  
  async updateBalanceBetweenAccounts(sender: Account, reciever: Account, amount: number, date: string) {
    
    let _id = date; // sanitized date --> month id
    this.dbProvider.addTransfer(_id, sender.getAccountName(), reciever.getAccountName(), amount, date); 
    // todo: transactiondate: also in the past (if in past) or always time of transaction?
  }

  // todo: superclass account and rename account? depends on how much needed
  async updateBalanceBetweenAccountAndExternalAccount(sender: any, reciever: any, amount: number, date: string ) {
    

  }

  async adjustAccountBalance(_id: string, accountName: string, operator: string)
  {
    let monthOverviewObject = await this.monthOverviewProvider.getMonthOverview(_id);
    let account = monthOverviewObject.getAccByName(accountName);
    if(operator === '+')
    {
      
    }
    else {

    }
  }







}
