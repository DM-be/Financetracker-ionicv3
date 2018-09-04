
import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {

  constructor() {
  }

  createChart(ctx: any, type: string, data: any, options: any)
  {
    return new Chart()
  }



}
