import { UserOverview } from './../../models/UserOverview';

import { Injectable } from '@angular/core';
import { DbProvider } from '../db/db';
import { ExternalAccount } from '../../models/ExternalAccount';

/*
  userOverview is in charge of retrieving/saving userOverview objects with dbProvider
*/
@Injectable()
export class UserOverviewProvider {

  constructor(public dbProvider: DbProvider) {}
  getUserOverview(): Promise<UserOverview> {
    return this.dbProvider.getUserOverview();
  }
  async saveUserOverview(userOverview: UserOverview): Promise<void> {
    await this.dbProvider.saveUserOverview(userOverview);
  }
}
