import { DbProvider } from './../../providers/db/db';
import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';

import * as moment from 'moment';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

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
