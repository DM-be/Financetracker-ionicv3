export class Dataset {

  public data: number[];
  public backgroundColor: any; // string []  or string
  public label: string;
  public fill: boolean;
  public borderColor: string; // needed for line charts
  /**
   *  data and backgroundcolor are needed for the chartjs instance
   *  
   *  
   */

  public backgroundColor_multiple: string[]; // multiple colors for bar / doughnut needed
  public backgroundColor_singular: string; // only one color needed for line, radar (gets set when created)

  constructor(data: number[], backgroundColors: string[], backgroundColor: string, label: string) {
    this.data = data;
    this.backgroundColor = backgroundColors;
    this.backgroundColor_singular = backgroundColor;
    this.label = label;
    this.fill = true; // defaulting on true --> settings to lines will set to false
  }


  public getBackGroundColors(): string[] {
    return this.backgroundColor;
  }

  public setFill(status: boolean): void {
    this.fill = status;
  }

  public setBorderColor(color: string): void {
    if (color) {
      this.borderColor = color;
    } else {
      this.borderColor = undefined;
    }

  }



  public setBackgroundColor_singular(color: string): void {
    this.backgroundColor_singular = color;
  }

  public getBackgroundColor_singular(): string {
    return this.backgroundColor_singular;
  }

  public setBackgroundColor_multiple(colors: string[]): void {
    this.backgroundColor_multiple = colors;
  }


  public setActiveBackgroundColor(singularOrMultiple: string) {
    if (singularOrMultiple === 'singular') {
      this.setBackGroundColor(this.backgroundColor_singular);
    } else {
      this.setBackGroundColor(this.backgroundColor_multiple);
    }
  }

  public setBackGroundColor(backgroundColor: any): void {
    this.backgroundColor = backgroundColor;
  }

  public setData(data: number[]): void {
    this.data = data;
  }

  public getData(): number[] {
    return this.data;
  }

}
