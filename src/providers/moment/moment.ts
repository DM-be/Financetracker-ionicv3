
import { Injectable } from '@angular/core';
import * as moment from 'moment';

/*
  Generated class for the MomentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MomentProvider {

  /* property only changed when the datepicker is changed, used to keep track of which monthoverview
  needs to be loaded */
  private selectedMonthAndyear: string = this.getCurrentMonthAndYear();
  private minDate: string;
  private maxDate: string;

  constructor() {}

  getCurrentMonthAndYear() {
    return moment().format('YYYY-MM');
  }

  public setSelectedMonthAndYear(selectedMonthAndyear: string): void
  {
    this.selectedMonthAndyear = selectedMonthAndyear;
  } 

  public getSelectedMonthAndYear(): string {
    return this.selectedMonthAndyear;
  }

  getCurrentMonthYearAndDay() {
    return moment().format('YYYY-MM-DD');
  }

  getCurrentExactDate() {
    return moment().format();
  }

  setMinDate(minDate: string)
  {
    this.minDate = minDate;
  }

  setMaxDate(maxDate: string)
  {
    this.maxDate = maxDate;
  }

  getMinDate(): string {
    return this.minDate;
  }

  getMaxDate(): string {
    return this.maxDate;
  }




  

}
