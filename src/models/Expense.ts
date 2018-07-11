import { Tag } from "./Tag";

export class Expense {

    public cost: number;
    public description: string;
    public createdDate: string;
    public usedAccountName: string; 
    public tags: Tag []; 
    
    


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

}