import {
  DatasetButton
} from './../../models/DatasetButton';
import {
  MomentProvider
} from './../moment/moment';
import {
  MonthOverviewProvider
} from './../month-overview/month-overview';
import {
  CategoryProvider
} from './../category/category';
import {
  Dataset
} from './../../models/Dataset';
import {
  Category
} from './../../models/Category';
import {
  Expense
} from './../../models/Expense';

import {
  Injectable
} from '@angular/core';
import * as Chart from 'chart.js';
import randomColor from 'randomcolor'
import {
  Events
} from 'ionic-angular';
import {
  Tag
} from '../../models/Tag';

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {

  private chartInstance: any; // holds the chartjs instance
  private labels: string[]; // kept here for setup reasons --> chart constructor needs labels before instantiation
  private labelType: string; // selected labelType --> determines the labels 
  private dataType: string; // data on which operations are executed --> category etc..., needs to be the same for each dataset

  public chartTypes: string[];
  private defaultDatasetButton: DatasetButton;
  private chartConfigs: {bar: Object, line: Object};


  constructor(public events: Events, public categoryProvider: CategoryProvider, public momentProvider: MomentProvider) {
    this.chartTypes = ['bar', 'line', 'doughnut', 'radar', 'polarArea' ];
    this.setupChartConfigs();
  }

  public setupChartConfigs(): void {
    this.chartConfigs = {
      bar: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
        }
      },
      line: {

      }
    }

  }

  public getChartTypes(): string[] {
    return this.chartTypes;
  }

  createNewChart(ctx: any, dataset ? : Dataset, type ? : string, expense ? : boolean, customLegend ? : boolean, customLabels ? : string[]) {
    let chartData = {
      datasets: [{
        data: dataset.data || [],
        backgroundColor: dataset.backgroundColor || []
      }],
      labels: customLabels || this.getLabels() // customlabels are for use in other components other than chartoverview
    };
    let chart = new Chart(ctx, {
      type: type || 'bar',
      data: chartData,
      options: {
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
        onClick: (evt, item) => {
          //evt.stopImmediatePropagation();
          //2x events fired 
          // touchend + click --> stilll need touchend?
          if (item.length > 0 && expense) {
            this.events.publish('expense:clicked', item[0]._index);
          }
        },
        legend: {
          display: false
        },
      },
    });
    if (!customLabels) {
      this.chartInstance = chart; // other charts other than the one on the mainpage are not referenced by this service
    }
    return chart;
  }

  public setLabelType(labelType: string): void {
    this.labelType = labelType;
  }

  public setDataType(dataType: string): void {
    this.dataType = dataType;
  }

  public getLabelType(): string {
    return this.labelType;
  }

  public getDataType(): string {
    return this.dataType;
  }

  public setChartType(type: string): void {
    this.chartInstance.config.type = type;
    this.chartInstance.update();
  }

  public getChartType(): string {
    if (this.chartInstance) {
      return this.chartInstance.config.type
    } else {
      return 'bar' // todo switch to default
    }
  }



  // only used once for the default instance, do not reuse, use appropiate setchartlabels and getter
  public getLabels(): string[] {
    return this.labels;
  }

  public addDataset(dataset: Dataset): void {
    this.chartInstance.data.datasets.push(dataset);
    this.chartInstance.update();
  }

  // setup first chart when landing on the chart overview page 
  public async setupDefaultChart(ctx): Promise < void > {
    let emptyDataset = new Dataset([], [], '','');
    this.createNewChart(ctx, emptyDataset);
    this.clearDatasets();
    let currentYearAndMonth = this.momentProvider.getCurrentYearAndMonth();
    let categories = await this.categoryProvider.getCategories(currentYearAndMonth);
    let filteredCategories = categories.filter(c => c.getTotalExpenseCost() > 0);
    let timeperiod = {
      from: currentYearAndMonth,
      to: currentYearAndMonth
    };
    let labelType = 'category'; // get from default settings in useroverview 
    let labels = filteredCategories.map(c => c.getCategoryName());
    let dataType = 'category'; // get from default settings in useroverview 
    let operationType = 'total'; // get from default settings in useroverview 
    this.setLabelType(labelType);
    this.setDataType(dataType);
    this.setChartLabels(labels);
    let data = await this.getDatasetData(timeperiod, undefined, labelType, dataType, operationType, filteredCategories);
    let backgroundColor = filteredCategories.map(c => c.getCategoryColor());
    let randomColor = this.getRandomColor();
    let dataObject = new Dataset(data, backgroundColor, randomColor, 'Dataset 1');
    
    //dataObject.setBackgroundColor_singular(randomColor);
    dataObject.setBackgroundColor_multiple(backgroundColor);
    this.defaultDatasetButton = new DatasetButton('total', 'category', {
      from: currentYearAndMonth,
      to: currentYearAndMonth,
    }, randomColor)
    this.addDataset(dataObject);

  }

  public getDefaultDatasetButton(): DatasetButton {
    return this.defaultDatasetButton;
  }



  async handleNewDataset(operationType: string, timeperiod: {
    from: string,
    to: string
  }, backgroundColor_singular: string, categories ? : Category[], tags ? : Tag[]) {
    console.log(categories);
    if (categories) {
      if (this.dataType === 'category' && this.labelType === 'category') {
        let data = await this.categoryProvider.getCategoryDatasetWithCategoryLabel(timeperiod.from, timeperiod.to, categories, operationType)
        let backgroundColor = categories.map(c => c.getCategoryColor());
        let dataset = new Dataset(data, backgroundColor, backgroundColor_singular, 'Dataset 2');
        //dataset.setBackgroundColor_singular(backgroundColor_singular);
        dataset.setBackgroundColor_multiple(backgroundColor);
        let labels = categories.map(c => c.getCategoryName());
        if (this.noDatasets()) {
          this.setChartLabels(labels);
        }
        // else keep current labels
        this.addDataset(dataset);
        this.updateActiveBackgroundColor(this.getChartType());
        this.updateBorderColor(this.getChartType());
        this.updateChartOptions(this.getChartType());
        this.updateFill(this.getChartType());
      }
      else if(this.dataType === 'category' && this.labelType === 'month')
      {
        categories.forEach(async cat => {
          let data = {
            data: [],
            backgroundColor: []
          };
          data.data = await this.categoryProvider.getCategoryDatasetWithMonthLabel(timeperiod.from, timeperiod.to, this.labelType, cat.getCategoryName(), operationType);
          for (let i = 0; i < data.data.length; i++) {
            
            data.backgroundColor.push(cat.getCategoryColor());
          }
          let dataset = new Dataset(data.data, data.backgroundColor, data.backgroundColor[0], 'Dataset 2');
          dataset.setBackgroundColor_multiple(data.backgroundColor);
          this.addDataset(dataset);
        });

        let labels = this.momentProvider.getLabelsBetweenTimePeriod(timeperiod.from, timeperiod.to);
        if (this.noDatasets()) {
          this.setChartLabels(labels);
        }
        this.updateActiveBackgroundColor(this.getChartType());
        this.updateBorderColor(this.getChartType());
        this.updateChartOptions(this.getChartType());
        this.updateFill(this.getChartType());
      }

    } else if (tags) {
      // and so on
    }
  }



  // refactor 
  public getDatasetData(timeperiod: {
    from: string,
    to: string
  }, categoryName: string, labelType: string, dataType: string, operationType: string, categories ? : Category[]) {
    if (dataType === 'category' && labelType === 'month') {
      return this.categoryProvider.getCategoryDatasetWithMonthLabel(timeperiod.from, timeperiod.to, labelType, categoryName, operationType)
    } else if (dataType === 'category' && labelType === 'category') {
      return this.categoryProvider.getCategoryDatasetWithCategoryLabel(timeperiod.from, timeperiod.to, categories, operationType)
    }
  }

  public updateActiveBackgroundColor(type: string) {
    if (type === 'line' || type === 'radar') {
      this.chartInstance.data.datasets.forEach((dataset: Dataset) => {
        dataset.setActiveBackgroundColor('singular');
      });
    } else {
      this.chartInstance.data.datasets.forEach((dataset: Dataset) => {
        dataset.setActiveBackgroundColor('multiple');
      });
    }
    this.chartInstance.update();

  }

  public updateFill(type: string): void
  {
    if (type === 'line')
    {
      this.chartInstance.data.datasets.forEach((dataset: Dataset) => {
        dataset.setFill(false);
      });
      this.chartInstance.update();
    }
    else {
      this.chartInstance.data.datasets.forEach((dataset: Dataset) => {
        dataset.setFill(true);
      });
      this.chartInstance.update();
    }
  }

  public updateBorderColor(type: string): void {
    if (type === 'doughnut' || type === 'polarArea')
    {
      this.chartInstance.data.datasets.forEach((dataset: Dataset) => {
        dataset.setBorderColor(undefined);
      });
      this.chartInstance.update();
    }
    else {
      this.chartInstance.data.datasets.forEach((dataset: Dataset) => {
        dataset.setBorderColor(dataset.getBackgroundColor_singular());
      });
      this.chartInstance.update();
    }

  }

  public updateChartOptions(type: string): void {
    this.chartInstance.scale = undefined;
    if (type === 'doughnut') {
      this.chartInstance.options = Chart.defaults.doughnut;
    } else if (type === 'line') {

      this.chartInstance.options = Chart.defaults.line;
    } else if (type === 'radar') {
      this.chartInstance.options = Chart.defaults.radar;

      console.log(Chart.defaults.radar);
    } else if (type === 'bar') {
      this.chartInstance.options = this.chartConfigs.bar;
    }
    this.chartInstance.update();
  }

  public getDatasets(): Dataset[] {
    return this.chartInstance.data.datasets;
  }

  public noDatasets(): boolean {
    if (this.chartInstance) {
      return this.chartInstance.data.datasets.length === 0;
    }
    return true;

  }
  public deleteDataset(index: number): void {
    this.chartInstance.data.datasets.splice(index, 1);
    if (this.noDatasets()) {
      this.clearChartLabels();
      this.labelType = undefined;
      this.dataType = undefined;
    }
    this.chartInstance.update();
  }

  public clearDatasets(): void {
    this.chartInstance.data.datasets = [];
    this.chartInstance.update();
  }

  public getChartInstance(): Chart {
    return this.chartInstance;
  }

  public getChartLabels(): string[] {
    return this.chartInstance.data.labels;
  }

  public setChartLabels(labels: string[]) {
    this.chartInstance.data.labels = labels;
    this.chartInstance.update();
  }

  public clearChartLabels(): void {
    this.chartInstance.data.labels = [];
    this.chartInstance.update();
  }

  public setType(type: string): void {
    this.chartInstance.type = type;
    this.chartInstance.update();
  }

  buildRandomColors(amount: number): string[] {
    let colors = [];
    for (let i = 0; i <= amount; i++) {
      colors.push(randomColor());
    }
    return colors;
  }

  public getRandomColor(): string {
    return randomColor();
  }


  private buildIconHTMLForComplexLegend(iconName: string): string {
    return `<ion-icon name="${iconName}" class="icon icon-md ion-md-${iconName} item-icon legend"></ion-icon>`;
  }

  public buildCategoryLegendHTML(categories: Category[]): string {
    let html = `<ul>`;
    categories.forEach(c => {
      if (c.getTotalExpenseCost() > 0) {
        html += `<li> <span style="background-color:${c.getCategoryColor()}">`
        html += this.buildIconHTMLForComplexLegend(c.getIconName());
        html += `</span>`
        html += '</li>'
      }
    });
    html += `</ul>`
    return html;
  }






}
