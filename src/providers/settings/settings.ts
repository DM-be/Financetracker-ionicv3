import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserOverview } from '../../models/UserOverview';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private userOverview: UserOverview;

  constructor(public http: HttpClient) {
    console.log('Hello SettingsProvider Provider');
  }

  



}
