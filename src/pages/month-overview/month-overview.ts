import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the MonthOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-month-overview',
  templateUrl: 'month-overview.html',
})
export class MonthOverviewPage {

  public selectedDate: string;
  categoryCosts: any;

  constructor(public navCtrl: NavController, public dbProvider: DbProvider) {
    this.selectedDate = moment().format('YYYY-MM');

    
  }

  async updateDate() {
    await this.dbProvider.getMonthOverview(this.selectedDate);
   // await this.dbProvider.getCategoryCosts(this.selectedDate);
  }

  async ionViewDidEnter() {
   // this.categoryCosts = await this.dbProvider.getCategoryCosts(this.selectedDate);
  }

  handleSwipe($e) {
    if ($e.offsetDirection == 4) {
      // Swiped right
      this.selectedDate = moment(this.selectedDate).subtract(1, 'M').format('YYYY-MM');
    } else if ($e.offsetDirection == 2) {
      // Swiped left
      this.selectedDate = moment(this.selectedDate).add(1, 'M').format('YYYY-MM');
    }
    else if ($e.offsetDirection == 8)
    {
      // swiped up
      let dateToTest = moment(this.selectedDate).add(1, 'years').format('YYYY');
      let now = moment().format('YYYY');
      if(dateToTest <= now)
      {
         this.selectedDate = moment(this.selectedDate).add(1, 'years').format('YYYY-MM');
      }
    }
    else if($e.offsetDirection == 16)
    {
      // swiped down
      this.selectedDate = moment(this.selectedDate).subtract(1, 'years').format('YYYY-MM');
    }
  }


}
