import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserOverview } from '../../models/UserOverview';
import { DbProvider } from '../db/db';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private userOverview: UserOverview;

  constructor(public dbProvider: DbProvider) {
    this.initialize();
    
    
  }
  async initialize() {
    this.userOverview = await this.dbProvider.getUserOverview();
  }

  getUserName(): string {
    return this.userOverview.getUserName();
  }
  



  



}
