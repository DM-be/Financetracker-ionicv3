import { MomentProvider } from './../providers/moment/moment';
export class DatasetButton {
    constructor(public operationType: string, public dataType: string, public timeperiod: {from: string, to: string}) {        
    }
    public getFormattedTimeperiod(): string {
        let momentProvider = new MomentProvider();
        let labels = momentProvider.getLabelsBetweenTimePeriod(this.timeperiod.from, this.timeperiod.to);
        return `from ${labels[0]} to ${labels[1]}`;
    }


}