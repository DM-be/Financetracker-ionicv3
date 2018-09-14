export class Dataset {

    public data: number [];
    public backgroundColor: string [];
    /**
     *  data and backgroundcolor are needed for the chartjs instance
     *  
     *  
     */
    constructor(data: number [], backgroundColor: string []) {
        this.data = data;
        this.backgroundColor = backgroundColor;
    }

    
    public getBackGroundColors(): string [] {
        return this.backgroundColor;
    }

    public setBackGroundColor(backgroundColor: string []): void {
        this.backgroundColor = backgroundColor;
    }

    public setData(data: number []): void {
        this.data = data;
    }

    public getData(): number [] {
        return this.data;
    }

}