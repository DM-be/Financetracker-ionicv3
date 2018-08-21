import { MomentProvider } from './../moment/moment';
import {
  Injectable
} from '@angular/core';
import {
  DbProvider
} from '../db/db';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { ExternalAccount } from '../../models/ExternalAccount';
import { UserOverviewProvider } from '../user-overview/user-overview';

/*
  Generated class for the ExternalAccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExternalAccountProvider implements AutoCompleteService{

  labelAttribute = "accountHolderName"
  constructor(public userOverviewProvider: UserOverviewProvider, public dbProvider: DbProvider, public momentProvider: MomentProvider) {
  }

  async getExternalAccounts(): Promise<ExternalAccount []> {
    let userOverview = await this.userOverviewProvider.getUserOverview();
    return userOverview.getExternalAccounts();
  }
 
  async addExternalAccount(externalAccount: ExternalAccount): Promise<void> {
    let userOverview = await this.userOverviewProvider.getUserOverview();
    userOverview.addExternalAccount(externalAccount);
    await this.userOverviewProvider.saveUserOverview(userOverview);
  }

  async transferFromExternalAccount(_id: string, accountHolderName: string, accountName: string, amount: number, transactionDate: string) {
    // _id_month: string, accountHolderName: string, recievingAccountName: string, amount: number, transactionDate: string
    await this.dbProvider.addTransferFromExternalAccount(_id, accountHolderName, accountName, amount, this.momentProvider.getCurrentExactDate());
  } 

  async getResults(keyword: string): Promise<ExternalAccount []> {
    let externalAccounts = await this.getExternalAccounts();
    return externalAccounts.filter((result) => {
      return result.accountHolderName.toLowerCase().startsWith(keyword.toLowerCase())
    })
  }


}
