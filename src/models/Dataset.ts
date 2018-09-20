export class Dataset {

    public data: number [];
    public backgroundColor: any; // string []  or string
    /**
     *  data and backgroundcolor are needed for the chartjs instance
     *  
     *  
     */

    public backgroundColor_multiple: string []; // multiple colors for bar / doughnut needed
    public backgroundColor_singular: string; // only one color needed for line, radar (gets set when created)

    constructor(data: number [], backgroundColor: string []) {
        this.data = data;
        this.backgroundColor = backgroundColor;
    }

    
    public getBackGroundColors(): string [] {
        return this.backgroundColor;
    }

    public setBackgroundColor_singular(color: string ): void {
        this.backgroundColor_singular = color; 
    }

    public setBackgroundColor_multiple(colors: string []): void {
        this.backgroundColor_multiple = colors;
    }

    public toggleActiveBackgroundColor(): void {
        if(this.backgroundColor === this.backgroundColor_multiple)
        {
            this.setBackGroundColor(this.backgroundColor_singular);
        }
        else {
            this.setBackGroundColor(this.backgroundColor_multiple);
        }

    }

    public setActiveBackgroundColor(singularOrMultiple: string)
    {
        if(singularOrMultiple === 'singular')
        {
            this.setBackGroundColor(this.backgroundColor_singular);
        }
        else {
            this.setBackGroundColor(this.backgroundColor_multiple);        }
    }

    public setBackGroundColor(backgroundColor: any): void {
        this.backgroundColor = backgroundColor;
    }

    public setData(data: number []): void {
        this.data = data;
    }

    public getData(): number [] {
        return this.data;
    }

}