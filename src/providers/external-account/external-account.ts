import {
  Injectable
} from '@angular/core';
import {
  DbProvider
} from '../db/db';
import { AutoCompleteService } from 'ionic2-auto-complete';

/*
  Generated class for the ExternalAccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExternalAccountProvider implements AutoCompleteService{

  labelAttribute = "accountHolderName"
  constructor(public dbProvider: DbProvider) {
  }

  async getExternalAccounts() {
    return this.dbProvider.getExternalAccounts();
  }

  async getResults(keyword: string) {

    let externalAccounts = await this.getExternalAccounts();
    externalAccounts.filter((result) => {
      return result.accountHolderName.toLowerCase().startsWith(keyword.toLowerCase())
    })
  }


}
