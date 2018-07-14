import { Tag } from "./Tag";
import * as moment from 'moment';

export class Expense {

    public cost: number;
    public description: string;
    public createdDate: string;
    public usedAccountName: string; 
    public tags: Tag []; 
    public categoryName: string; 
    
    


    constructor( cost: number, description: string, createdDate: string, usedAccount: string, tags?: Tag []) {
        this.cost = cost;
        this.description = description;
        this.createdDate = createdDate;
        this.usedAccountName = usedAccount;
        
        if(tags) {
            this.tags = tags.map(t => new Tag(t.tagName, t.createdDate));
        }
        else {
            this.tags = [];
        }

    }

    public getCost() {
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

}