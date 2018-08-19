import {
  Injectable
} from '@angular/core';
import {
  DbProvider
} from '../db/db';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { ExternalAccount } from '../../models/ExternalAccount';
import { MonthOverviewProvider } from '../month-overview/month-overview';

/*
  Generated class for the ExternalAccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExternalAccountProvider implements AutoCompleteService{

  labelAttribute = "accountHolderName"
  constructor(public dbProvider: DbProvider, public monthOverviewProvider: MonthOverviewProvider) {
  }

  getExternalAccounts(): Promise<ExternalAccount []> {
    return this.dbProvider.getExternalAccounts();
  }

  async addExternalAccount(externalAccount: ExternalAccount): void
  {
    await this.monthOverviewProvider.addExternalAccountToMonthOverview(externalAccount);
    
  }

  async getResults(keyword: string): Promise<ExternalAccount []> {

    let externalAccounts = await this.dbProvider.getExternalAccounts();
    return externalAccounts.filter((result) => {
      return result.accountHolderName.toLowerCase().startsWith(keyword.toLowerCase())
    })
  }


}
