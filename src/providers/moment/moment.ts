
import { Injectable } from '@angular/core';
import * as moment from 'moment';

/*
  Generated class for the MomentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MomentProvider {

  constructor() {}

  getCurrentMonthAndYear() {
    return moment().format('YYYY-MM');
  }

  getCurrentMonthYearAndDay() {
    return moment().format('YYYY-MM-DD');
  }

}
