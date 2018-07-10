import { Expense } from "./Expense";
import { Account } from "./Account";
import { Category } from "./Category";
import { Tag } from "./Tag";

export class MonthOverView {

    private _id: string;
    private _rev: string;
    private categories: Category [];
    private accounts: Account []; 
    private usedTags: Tag []; // keeps track of all tags (for use in auto completion instead of looping over every expense)


    // todo: 
    constructor(_id: string, accounts: Account [], categories?: Category [] , _rev?: string, usedTags?: Tag []) {
        this._id = _id;
        this._rev = _rev;// to do if else or always start with empty arr? be consistent

        this.categories = [];
        this.accounts = [];
        this.usedTags = [];
        if(!(accounts instanceof Account))
        {
            this.accounts = accounts.map(a => new Account(a.owner, a.accountName, a.initialBalance, a.finalBalance, a.transactions));
        }
        else {
            this.accounts = accounts;
        }
        if(categories)
        {
            this.categories = categories.map(c => new Category(c.categoryName, c.expenses, c.budget, c.createdDate ));
        }
        if(usedTags)
        {
            this.usedTags = usedTags.map(t => new Tag(t.tagName));
        }
      
    }

    public getAllAccounts(): Account []
    {
        return this.accounts;
    }

    public getAccByName(accountName: string): Account
    {
        return this.accounts.find(account => account.getAccountName() === accountName);
    
    }

    public getCategoryByName(categoryName: string): Category 
    {
        return this.categories.find(category => category.getCategoryName() === categoryName);
    }

    public addCategory(category: Category): void 
    {
        this.categories.push(category);
    }

    public doesContainCategory(categoryName: string): boolean {
        // refactor
        let index = this.categories.findIndex(category => category.getCategoryName() === categoryName);
        if(index === -1)
        {
            return false;
        }
        else {
            return true;
        }
    }


    


}