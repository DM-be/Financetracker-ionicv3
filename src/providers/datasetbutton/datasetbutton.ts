import { DatasetButton } from './../../models/DatasetButton';
import { Injectable } from '@angular/core';

/*
  Generated class for the DatasetbuttonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatasetbuttonProvider {

  public datasetButtons: DatasetButton [];


  constructor() {
    this.datasetButtons = [];
  }

  public getDatasetButtonLabel(): string {
    return `Dataset ${this.datasetButtons.length}`// for use in labeling the legends
  }

  public addDatasetButton(datasetButton: DatasetButton): void
  {
    this.datasetButtons.push(datasetButton);
  }

  public getDatasetButtons(): DatasetButton [] {
    return this.datasetButtons;
  }

  public deleteDatasetButton(index: number)
  {
    this.datasetButtons.splice(index, 1);
  }
  
  





}
