import {
  Chart
} from 'chart.js';
import {
  DatasetbuttonProvider
} from './../../providers/datasetbutton/datasetbutton';
import {
  DatasetButton
} from './../../models/DatasetButton';
import {
  MonthOverView
} from './../../models/MonthOverview';
import {
  CategoryProvider
} from './../../providers/category/category';
import {
  MomentProvider
} from './../../providers/moment/moment';
import {
  ChartProvider
} from './../../providers/chart/chart';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  AlertController,
  Platform,
  ActionSheetController, 
} from 'ionic-angular';
import {
  MonthOverviewProvider
} from '../../providers/month-overview/month-overview';
import {
  DatasetPage
} from '../dataset/dataset';

/**
 * Generated class for the ChartOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart-overview',
  templateUrl: 'chart-overview.html',
})
export class ChartOverviewPage {

  public selectedYearAndMonth: string;
  public monthOverview: MonthOverView;
  public selectedChartType: string;
  public chart: Chart;
  public ctx = document.getElementById("myChart");
  public datasetButtons: DatasetButton[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider, public momentProvider: MomentProvider, public monthOverviewProvider: MonthOverviewProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, public datasetButtonProvider: DatasetbuttonProvider, public platform: Platform,public actionSheetCtrl: ActionSheetController) {
    this.selectedYearAndMonth = this.momentProvider.getSelectedYearAndMonth() || this.momentProvider.getCurrentYearAndMonth();
  }

  async ionViewCanEnter() {
    this.setupDefaultChart();
    this.datasetButtons = this.datasetButtonProvider.getDatasetButtons();
  }

  ionViewWillEnter() {
    this.chart = this.chartProvider.getChartInstance();
    console.log(this.chart);
  }

  private refreshDatasetButtons(): void {
    this.datasetButtons = this.datasetButtonProvider.getDatasetButtons();
  }

  private async setupDefaultChart() {
    await this.refreshMonthOverview();
    this.ctx = document.getElementById("myChart");
    await this.chartProvider.setupDefaultChart(this.ctx);
    this.chart = this.chartProvider.getChartInstance();
  }

  public async updateDate(): Promise < void > {
    this.momentProvider.setSelectedYearAndMonth(this.selectedYearAndMonth);
    await this.refreshMonthOverview();
  }
  private async refreshMonthOverview(): Promise < void > {
    this.monthOverview = await this.monthOverviewProvider.getMonthOverview(this.selectedYearAndMonth);
  }

  public addDatasetModal(): void {
    let datasetModal = this.modalCtrl.create(DatasetPage, {
      ctx: this.ctx
    });
    datasetModal.present()
    datasetModal.onDidDismiss(datasetModalData => {
      if (datasetModalData) {
        const {
          selectedCategories,
          operationType,
          timeperiod,
          backgroundColor
        } = datasetModalData;
        this.chartProvider.handleNewDataset(operationType, timeperiod, backgroundColor, selectedCategories);
        this.refreshDatasetButtons();
      }
    });
  }

  public deleteDataset(i: number): void {
    this.chartProvider.deleteDataset(i);
    this.datasetButtonProvider.deleteDatasetButton(i);
    this.refreshDatasetButtons();
  }

  public setChartTypeAlert(): void {
    let alert = this.alertCtrl.create();
    alert.setTitle('Chart type');
    let selectedType = this.chartProvider.getChartType();
    this.chartProvider.getChartTypes().forEach(type => {
      alert.addInput({
        type: 'radio',
        label: type,
        value: type,
        checked: type === selectedType
      })
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (type: string) => {
        this.chartProvider.setChartType(type);
        this.chartProvider.updateChartInstanceAccordingToType(type);
      }
    });
    alert.present();
  }

  presentActionSheet(datasetIndex: number): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: `Dataset ${datasetIndex + 1}`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.deleteDataset(datasetIndex)
        },
        {
          text: 'Details',
          icon: 'arrow-forward',
          handler: () => {
            console.log('Details clicked');
          }
        },
        {
          text: 'Favorite',
          icon: 'star',
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  presentDatasetButtonAlert(datasetIndex): void {

  }

}
