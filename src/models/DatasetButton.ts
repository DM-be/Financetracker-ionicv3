import { MomentProvider } from './../providers/moment/moment';
export class DatasetButton {
    constructor(public operationType: string, public dataType: string, public timeperiod: {from: string, to: string}, public backgroundColor: string, public selectedData: string []) {        
    }
    public getFormattedTimeperiod(): string {
        let momentProvider = new MomentProvider();
        let labels = momentProvider.getLabelsBetweenTimePeriod(this.timeperiod.from, this.timeperiod.to);
        return `from ${labels[0]} to ${labels[1]}`;
    }

   public getFormattedSelectedData(): string {
       let string = '';
       this.selectedData.forEach(data => {
           string += `${data} `;
       });
       return string;
   }


}