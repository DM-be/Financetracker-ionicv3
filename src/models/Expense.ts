import { Tag } from "./Tag";
import * as moment from 'moment';

export class Expense {

    public cost: number;
    public description: string;
    public createdDate: string;
    public usedAccountName: string; 
    public tags: Tag []; 
    public categoryName: string; 
    public iconName: string; 
    
    


    constructor( cost: number, description: string, createdDate: string, usedAccount: string, categoryName: string, iconName: string, tags?: Tag []) {
        this.cost = cost;
        this.description = description;
        this.createdDate = createdDate;
        this.usedAccountName = usedAccount;
        this.categoryName = categoryName;
        this.iconName = iconName;
        if(tags) {
            this.tags = tags.map(t => new Tag(t.tagName, t.createdDate));
        }
        else {
            this.tags = [];
        }

    }

    public getCost(): any {
        return this.cost;
    }

    public getUsedAccountName() {
        return this.usedAccountName;
    }
    public getTags(): Tag[] {
        return this.tags;
    }
    public getDescription(): string {
        return this.description;
    }

    public getCreatedDate(): string
    {
        return this.createdDate;
    }

    public getFormattedDate(): string 
    {
        return moment(this.createdDate).format('dddd, Do');
    }

    public getCategoryName(): string {
        return this.categoryName;
    }

    public setIconName(iconName: string): void  {
        this.iconName = iconName;
    }

    public getIconName(): string {
        return this.iconName;
    }

    public setCreatedDate(date: any): void {
        this.createdDate = date;
    }

 
}