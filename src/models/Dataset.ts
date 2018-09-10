export class Dataset {

    public data: number [];
    public backGroundColor: string [];
    public labels: string [];
    
    /**
     *
     */
    constructor(data: number [], backgroundColor: string [], labels: string []) {
        this.data = data;
        this.backGroundColor = backgroundColor;
        this.labels = labels;
    }

    
    public getBackGroundColor(): string [] {
        return this.backGroundColor;
    }

   public getLabels(): string []
   {
       return this.labels;
   }
    
}