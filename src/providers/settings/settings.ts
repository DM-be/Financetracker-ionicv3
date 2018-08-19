import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserOverview } from '../../models/UserOverview';
import { DbProvider } from '../db/db';
import { UserOverviewProvider } from '../user-overview/user-overview';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  constructor(public userOverviewProvider: UserOverviewProvider) {}
 



  



}
