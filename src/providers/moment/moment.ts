
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
  private selectedYearAndMonth: string = this.getCurrentYearAndMonth(); // starts at current month and year
  private minDate: string;
  private maxDate: string;



  /* only full ISO_8601 strings are used in the database, with the exception of doc ids, which are in yearMonth format
  every other date gets filtered here
  */
  constructor() {}

  /* used for the _id field in documents in the database */
  getCurrentYearAndMonth(): string {
    return moment().format('YYYY-MM');
  }

  getCurrentYearMonthAndDay(): string {
    return moment().format('YYYY-MM-DD');
  }

  getCurrentDate_ISO_8601(): string {
    return moment().format();
  }

  

  public setSelectedYearAndMonth(selectedYearAndMonth: string): void
  {
    this.selectedYearAndMonth = selectedYearAndMonth;
  } 

  public getCurrentDateMinusAMonth_ISO_8601(): string {
    return moment().subtract(1, 'month').format();
  }

  public getLabelsBetweenTimePeriod(from: string, to: string)
  {
    let labels = [];
    let toPlusOneMonth = moment(to).add(1, 'month').format('YYYY-MM');
    while(from !== toPlusOneMonth)
    {
      let momentObject = moment(from, "YYYY-MM");
      labels.push(moment(momentObject).format("MMM YY"));
      from = moment(from).add(1, 'month').format('YYYY-MM')
    }
    if(labels.length === 1)
    {
      labels[1] = labels[0]; // todo seperate function for datasetbutton (from same montht to same month )
    }
    return labels;
  }

  public getSelectedYearAndMonth(): string {
    return this.selectedYearAndMonth;
  }

  public getFormattedDateInYearAndMonth(date: string):string  {
    return moment(date).format('YYYY-MM');
  }

  public getFormattedDateInYearMonthDay(date: string):string  {
    return moment(date).format('YYYY-MM-DD');
  }

  public getFormattedDateFromNow(date_ISO_8601): string {
    return moment(date_ISO_8601).fromNow();
  }

  public getFormattedDateCalendar(date_ISO_8601): string {
    return moment(date_ISO_8601).calendar();
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
