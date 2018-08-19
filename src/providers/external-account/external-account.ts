import {
  Injectable
} from '@angular/core';
import {
  DbProvider
} from '../db/db';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { ExternalAccount } from '../../models/ExternalAccount';
import { MonthOverviewProvider } from '../month-overview/month-overview';
import { UserOverviewProvider } from '../user-overview/user-overview';

/*
  Generated class for the ExternalAccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExternalAccountProvider implements AutoCompleteService{

  labelAttribute = "accountHolderName"
  constructor(public userOverviewProvider: UserOverviewProvider) {
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

  async getResults(keyword: string): Promise<ExternalAccount []> {

    let externalAccounts = await this.getExternalAccounts();
    return externalAccounts.filter((result) => {
      return result.accountHolderName.toLowerCase().startsWith(keyword.toLowerCase())
    })
  }


}
